const { connectNATS } = require("./config/nats");
const publishJob = require("./jobs/publisher");

(async () => {
  const nc = await connectNATS();
  publishJob(nc);
})();
