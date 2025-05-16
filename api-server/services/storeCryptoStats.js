const axios = require("axios");
const CryptoStat = require("../models/CryptoStat"); // Assuming your model

const storeCryptoStats = async (ids) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        vs_currencies: "usd",
        ids,
        include_market_cap: "true",
        include_24hr_change: "true",
      },
    }
  );

  const data = response.data;

  const statsToSave = currencies.map((coin) => ({
    coin,
    price: data[coin].usd,
    marketCap: data[coin].usd_market_cap,
    change24h: data[coin].usd_24h_change,
  }));

  await CryptoStat.insertMany(statsToSave);
  return statsToSave;
};

module.exports = storeCryptoStats;
