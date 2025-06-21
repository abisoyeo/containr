const express = require("express");
const router = express.Router();
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

// req.isAuthenticated is provided from the auth router
router.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

router.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
