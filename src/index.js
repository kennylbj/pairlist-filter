import fs from "fs/promises";
import schedule from "node-schedule";
import { exchange, blacklist } from "./exchanges/gateio.js";

const REFRESH_PERIOD = 1800;

const generateFile = async () => {
  const pairs = await blacklist();
  const data = {
    pairs,
    refresh_period: REFRESH_PERIOD,
  };

  await fs.mkdir("pairs", { recursive: true });
  await fs.writeFile(
    `pairs/blacklist_${exchange}.json`,
    JSON.stringify(data, null, 2),
    "utf8"
  );
};

// first time
await generateFile();

let processing = false;
schedule.scheduleJob("*/30 * * * *", async () => {
  if (processing) return;
  processing = true;
  console.log("job start");
  await generateFile();
  console.log("job end");
  processing = false;
});
