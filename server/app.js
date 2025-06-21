require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/TodoDb";

// move to docker env?
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "NLteCSvqvj4hIzy69Vb6V8woXdrQW3aV",
  issuerBaseURL: "https://dev-jswgsvvssxkp0m7o.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use("/", todoRoutes);
app.use("/", authRoutes);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Db connected");
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
