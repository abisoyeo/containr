require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const session = require("express-session");
const { auth } = require("express-openid-connect");

// Import configurations
const connectDB = require("./config/database");
const sessionConfig = require("./config/session");
const corsConfig = require("./config/cors");
const auth0Config = require("./config/auth0");
const syncUserMiddleware = require("./middleware/syncUser");

// Import routes
const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger("dev"));
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(express.json());
app.use(auth(auth0Config));

app.use(syncUserMiddleware);

// Routes
app.use("/api", authRoutes);
app.use("/api", todoRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
