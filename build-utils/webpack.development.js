const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");
const path = require("path");
const webpack = require("webpack");

module.exports = () => {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + "/.env.dev";
  const fileEnv = dotenv.config({ path: basePath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    output: {
      filename: "production.js",
    },
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  modifyVars: {
                    "primary-color": "#0052CC",
                    // "border-radius-base": "5px",
                  },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin(), new webpack.DefinePlugin(envKeys)],
  };
};
