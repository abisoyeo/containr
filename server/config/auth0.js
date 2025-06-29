const auth0Config = {
  idpLogout: true,
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.AUTH0_BASE_URL || "http://localhost:3000",
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
    // Disable default login and logout routes since we're using custom ones
    login: false,
    logout: false,
    // Redirect to React app after logout
    postLogoutRedirect: process.env.CLIENT_URL || "http://localhost:5173",
  },
};

module.exports = auth0Config;
