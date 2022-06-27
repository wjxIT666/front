const CracoLessPlugin = require('craco-less');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
module.exports = {
  webpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
    ]
  },
  babel: {
    plugins: [
      [
        "import", 
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": true// true 针对less
        }
      ]
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};