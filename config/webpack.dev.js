const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')

const config = {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    static: paths.public,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    allowedHosts: "all",
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          /* { loader: 'sass-loader', options: { sourceMap: true } }, */
        ],
      },
    ],
  },
}

if(Array.isArray(common)) {
  module.exports = common.map((cmn,idx) => {
    const cfg = merge(cmn, config);
    if(idx > 0) delete cfg.devServer;
    console.debug(cfg);
    return cfg;
  });
} else {
  module.exports = merge(common,config);
}

// console.debug(JSON.stringify(module.exports,null,"\t"));