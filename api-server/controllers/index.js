const asyncHandler = require("express-async-handler");
const storeCryptoStats = require("../services/storeCryptoStats");
const CryptoStat = require("../models/CryptoStat"); // Assuming your model

const fetchCryptoStats = async (req, res) => {
  const currencies = "bitcoin,ethereum,matic-network";
  const result = await storeCryptoStats(currencies);
  res.json({ success: true, data: result });
};

const getLatestStats = async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ message: "coin is required" });

  const latestStat = await CryptoStat.findOne({ coin })
    .sort({ createdAt: -1 })
    .lean();

  if (!latestStat) {
    return res.status(404).json({ message: "No data found for this coin" });
  }

  res.json({
    price: latestStat.price,
    marketCap: latestStat.marketCap,
    "24hChange": latestStat.change24h,
  });
};

const getDeviation = async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ message: "coin is required" });

  const records = await CryptoStat.find({ coin })
    .sort({ createdAt: -1 })
    .limit(100)
    .select("price")
    .lean();

  const prices = records.map((r) => r.price);
  if (prices.length < 2) {
    return res.status(400).json({ message: "Not enough data to calculate deviation" });
  }

  const mean = prices.reduce((sum, p) => sum + p, 0) / prices.length;
  const variance = prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / prices.length;
  const deviation = Math.sqrt(variance);

  res.json({ deviation: +deviation.toFixed(2) });
};



module.exports = { 
    fetchCryptoStats:asyncHandler(fetchCryptoStats),
    getLatestStats:asyncHandler(getLatestStats), 
    getDeviation:asyncHandler(getDeviation)
};
