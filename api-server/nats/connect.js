const { connect, credsAuthenticator } = require("nats");
require("dotenv").config();

const connectNATS = async () => {
  const nc = await connect({
    servers: "tls://connect.ngs.global:4222",
    authenticator: credsAuthenticator({
      jwt: process.env.NATS_JWT,
      seed: process.env.NATS_NKEY_SEED,
    }),
  });

  console.log("Connected to NATS");
  return nc;
};

module.exports = {connectNATS};
