const { execSync } = require("child_process");
const { merge } = require("lodash");
const path = require("path");

const includePaths = [
  path.resolve(__dirname, "./src/assets/scss"),
  path.resolve(__dirname, "./node_modules/foundation-sites/scss"),
];

let gitCommit = "development";
let gitVersion = "development";

try {
  gitCommit = execSync("git rev-parse HEAD").toString();
  gitVersion = execSync("git rev-parse --short HEAD").toString();
} catch (error) {
  // ...
}

module.exports = {
  baseUrl: "",
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        includePaths,
        data: `
          @import "settings";
          @import "foundation";
        `,
      },
    },
  },
  chainWebpack: config => {
    config.plugin("define").tap(args => {
      merge(args[0], {
        "process.env": {
          GIT_COMMIT: JSON.stringify(gitCommit.trim()),
          GIT_VERSION: JSON.stringify(gitVersion.trim()),
          CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
          SENTRY_DNS: JSON.stringify(process.env.SENTRY_DNS),
        },
      });

      return args;
    });
  },
};
