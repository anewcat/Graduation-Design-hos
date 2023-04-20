// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-auto-import/webpack")({
        /* options */
      }),
    ],
  },
  devServer: {
    proxy: {
      "/image": {
        target: "https://www.hualigs.cn/",
        pathRewrite: { "^/image": "" },
      },
    },
  },
};
