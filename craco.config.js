const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@constants": path.resolve(__dirname, "src/constants"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components")
    }
  }
};
