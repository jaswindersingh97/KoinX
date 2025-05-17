const { StringCodec } = require("nats");
const storeCryptoStats = require("../services/storeCryptoStats");

const subscribeToNATS = (nc) => {
  const sc = StringCodec();
  const sub = nc.subscribe("crypto.update");

  (async () => {
    for await (const m of sub) {
      const msg = JSON.parse(sc.decode(m.data));
      if (msg.trigger === "update") {
        console.log("Received update event, storing stats...");
        await storeCryptoStats(); // Assuming it handles all 3 currencies
      }
    }
  })();
};

module.exports = subscribeToNATS;
