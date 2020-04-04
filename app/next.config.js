const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias["components"] = path.join(
      __dirname,
      "components"
    );
    return config;
  },
  env: {
    locationIQAPIKey: process.env.LOCATIONIQ_API_KEY,
  },
}