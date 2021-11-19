const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  externals: [
    'node-fetch',
    'requirejs',
    'date-fns',
    'preact',
    'eta',
    'htm',
    'dompurify',
    'papaparse',
    'monaco-editor',
    'echarts',
    '@yaireo/tagify',
    'interactjs',
    'lunr',
    'highlight.js/lib/core',
    'highlight.js/lib/languages/sql',
    'cytoscape',
    'exceljs',
  ],
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    library: {
      type: 'amd-require'
    }
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    new CopyWebpackPlugin(
      { 
        patterns: [{
          from: 'node_modules/@sqlframes/repl-app/dist/libs.mjs', to: 'js/sqlframes/libs.mjs' 
        },{
          from: 'node_modules/@sqlframes/repl-app/dist/main.mjs', to: 'js/sqlframes/main.mjs' 
        },
        ]
      }),

    new CopyWebpackPlugin(
      { 
        patterns: [{
          from: 'node_modules/@sqlframes/repl-app/dist/api.d.ts', to: 'api/api.d.ts' },
        ]
      }),

    new CopyWebpackPlugin(
      { 
        patterns: [{
          from: 'node_modules/@sqlframes/repl-app/dist/styles/themes/*', to: 'styles/themes/[name][ext]' },
        ]
      }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'SQL Frames + React DEMO',
      // favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
