const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const dotenv = require("dotenv");
const path = require("path");
const webpack = require("webpack");

module.exports = () => {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + "/.env.prod";
  const fileEnv = dotenv.config({ path: basePath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  return {
    devtool: "nosources-source-map",
    output: {
      filename: "production.js",
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    devServer: {
      host: "0.0.0.0",
      port: 8080,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps for css
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
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
