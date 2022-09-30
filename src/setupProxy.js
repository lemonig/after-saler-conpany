const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/*", // 指定需要转发的请求
    createProxyMiddleware({
      // target: "http://192.168.188.3:8901/", //服务器的地址
      target: "https://portal.greandata.com:1451/", //服务器的地址
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api",
      },
      // pathRewrite(path) {
      //   return path.replace('/api', '');
      // }
    })
  );
};
