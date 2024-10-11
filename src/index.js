import fs from "fs/promises";
import schedule from "node-schedule";
import http from "http";
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
    JSON.stringify(data),
    "utf8"
  );
};

// create http server
const server = http.createServer(async (req, res) => {
  if (req.url === `/blacklist/${exchange}` && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = await fs.readFile(`pairs/blacklist_${exchange}.json`, "utf-8");
    const jsonData = JSON.parse(data);
    res.end(JSON.stringify(jsonData));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// start the server
// 0.0.0.0 for docker
// 127.0.0.1 without docker
server.listen(3000, "0.0.0.0", async () => {
  console.log("Http server started");
});

// first time
await generateFile();

// schedule job
let processing = false;
schedule.scheduleJob("*/30 * * * *", async () => {
  if (processing) return;
  processing = true;
  console.log("job start");
  await generateFile();
  console.log("job end");
  processing = false;
});
