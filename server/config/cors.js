const corsConfig = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};

module.exports = corsConfig;
