const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
  loaderByName,
} = require("@craco/craco");
const webpack = require("webpack");
const CracoLessPlugin = require("craco-less");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);
const isPro = (dev) => dev === "production";

module.exports = {
  // mode: "development",
  // devServer: {
  //   port: 3001,
  // },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (isPro(env)) {
        webpackConfig.mode = "production";
        webpackConfig.devtool = "source-map";
        webpackConfig.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {},
            },
          })
          // webpackConfig.plugins.push(
          //   new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
          // )
        );
        webpackConfig.optimization = {
          flagIncludedChunks: true,
          usedExports: true,
          mergeDuplicateChunks: true,
          concatenateModules: true,
          minimize: true,
          minimizer: [
            //webpack v5 自带最新的
            new TerserPlugin({
              parallel: true, // 可省略，默认开启并行
              terserOptions: {
                toplevel: true, // 最高级别，删除无用代码
                ie8: true,
                safari10: true,
              },
            }),
          ],
        };
      }

      webpackConfig.externals = {};
      console.log("环境：", env, paths);
      return webpackConfig;
    },
    alias: {
      "@Components": pathResolve("src/components"),
      "@": pathResolve("src"),
    },
  },
  babel: {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            chrome: "49",
            ios: "10",
          },
        },
      ],
    ],
  },

  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 主题色配置
            //https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
