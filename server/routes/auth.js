const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const syncUserMiddleware = require("../middleware/syncUser");
const router = express.Router();

// Custom login route that redirects to React app after successful auth
router.get("/login", (req, res) => {
  const returnTo =
    req.query.returnTo || process.env.CLIENT_URL || "http://localhost:5173";

  // save session in redis
  // save user to db?
  // use db's id in todos?
  // what about if i want more fields from user
  // req.oidc.user

  res.oidc.login({
    returnTo: returnTo,
    authorizationParams: {
      redirect_uri: `${
        process.env.AUTH0_BASE_URL || "http://localhost:3000"
      }/callback`,
    },
  });
});

// Custom logout route
router.get("/logout", (req, res) => {
  const returnTo =
    req.query.returnTo || process.env.CLIENT_URL || "http://localhost:5173";

  res.oidc.logout({
    returnTo: returnTo,
  });
});

// Check authentication status endpoint for React app
router.get("/auth-status", (req, res) => {
  res.json({
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.isAuthenticated() ? req.oidc.user : null,
  });
});

// routes/auth.js - Updated profile route
router.get("/profile", requiresAuth(), syncUserMiddleware, async (req, res) => {
  res.json({
    // Auth0 data
    auth0: req.oidc.user,
    // Your database data with custom fields
    profile: {
      id: req.dbUser._id,
      email: req.dbUser.email,
      name: req.dbUser.name,
      picture: req.dbUser.picture,
      preferences: req.dbUser.preferences,
      createdAt: req.dbUser.createdAt,
      lastLogin: req.dbUser.lastLogin,
    },
  });
});

// New route to update user preferences
router.put("/profile", requiresAuth(), syncUserMiddleware, async (req, res) => {
  try {
    const { preferences } = req.body;

    req.dbUser.preferences = { ...req.dbUser.preferences, ...preferences };
    await req.dbUser.save();

    res.json({ msg: "Profile updated", user: req.dbUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
