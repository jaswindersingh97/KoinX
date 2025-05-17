const cron = require("node-cron");

const publishJob = (nc) => {
  cron.schedule("*/15 * * * *", async () => {
    console.log("Publishing update...");
    nc.publish("crypto.update", Buffer.from(JSON.stringify({ trigger: "update" })));
  });
};

module.exports = publishJob;
