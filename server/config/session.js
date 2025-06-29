const session = require("express-session");
const { RedisStore } = require("connect-redis");
const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});
// Handle Redis client connection errors
client.on("error", (err) => {
  console.error("Redis Client Error:", err); // <--- This will log connection errors
});

// Connect to Redis
client
  .connect()
  .then(() => {
    console.log("Redis client connected successfully!"); // <--- This will log success
  })
  .catch((err) => {
    console.error("Failed to connect to Redis client:", err); // <--- This will log connection failures
  });
const sessionConfig = {
  store: new RedisStore({ client: client }),
  secret: process.env.SESSION_SECRET || "a_default_secret_for_dev",
  resave: false,
  // name: "sessionId", // chnage name of cookie
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};

module.exports = sessionConfig;
