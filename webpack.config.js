const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "development" }) => {
  return merge(
    {
      mode,
      entry: "./src/index.js",
      devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
        port: 2022,
      },
      output: {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "bundled.js",
        assetModuleFilename: "assets/[name][hash][ext]",
      },
      module: {
        rules: [
          {
            test: /\.(png|jpg|JPG|jpeg|gif|svg)$/,
            type: "asset",
          },
          {
            test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
            type: "asset",
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  plugins: ["@babel/plugin-transform-runtime"],
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
          "@Actions": path.resolve(__dirname, "src/actions/"),
          "@Assets": path.resolve(__dirname, "src/assets/"),
          "@Components": path.resolve(__dirname, "src/components/"),
          "@Constants": path.resolve(__dirname, "src/constants/"),
          "@Http": path.resolve(__dirname, "src/http/"),
          "@Routes": path.resolve(__dirname, "src/routes/"),
          "@Services": path.resolve(__dirname, "src/services/"),
          "@Store": path.resolve(__dirname, "src/store/"),
          "@Stype": path.resolve(__dirname, "src/styles"),
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
    },
    modeConfiguration(mode)
  );
};
