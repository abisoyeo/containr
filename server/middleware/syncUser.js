const User = require("../Models/user");

const syncUserMiddleware = async (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    try {
      const auth0User = req.oidc.user;

      // Find or create user in your database
      let user = await User.findOne({ auth0Id: auth0User.sub });

      if (!user) {
        // Create new user
        user = await User.create({
          auth0Id: auth0User.sub,
          email: auth0User.email,
          name: auth0User.name,
          picture: auth0User.picture,
          lastLogin: new Date(),
        });
      } else {
        // Update existing user
        user.lastLogin = new Date();
        user.name = auth0User.name; // Keep Auth0 data in sync
        user.picture = auth0User.picture;
        await user.save();
      }

      // Attach DB user to request
      req.dbUser = user;
    } catch (error) {
      console.error("User sync error:", error);
    }
  }
  next();
};

module.exports = syncUserMiddleware;
