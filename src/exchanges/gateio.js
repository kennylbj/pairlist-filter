import got from "got";
import tunnel from "tunnel";

const MIN_CAP_IN_MILLION = 30;
const api = got.extend({
  agent: {
    https: tunnel.httpsOverHttp({
      proxy: {
        host: "127.0.0.1",
        port: 1081,
      },
    }),
  },
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchList = async (num = 50) => {
  try {
    const result = await api
      .get("https://www.gate.io/apiw/v2/market/spots?exchange_type=ALL")
      .json();
    return result.data.slice(0, num);
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getPairInfo = async (pair) => {
  try {
    const result = await api
      .get("https://www.gate.io/apiw/v2/market/tickers/" + pair)
      .json();
    return result.data;
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const whitelist = async () => {
  return [];
};

export const blacklist = async () => {
  const pairlist = await fetchList(120);
  const result = [];
  let index = 0;
  for (const pair of pairlist) {
    const pairName = pair[0];
    const standardPairName = pairName.replace("_", "/");
    const pairInfo = await getPairInfo(pairName);
    const marketCap = Number(pairInfo.marketCap);
    if (
      marketCap / 1000000 < MIN_CAP_IN_MILLION &&
      !/[0-9][SL]\/USDT$/.test(standardPairName)
    ) {
      console.log(index, standardPairName, (marketCap / 1000000).toFixed(2));
      result.push(standardPairName);
    }
    index += 1;
    sleep(500);
  }
  return result;
};

export const exchange = "gateio";
