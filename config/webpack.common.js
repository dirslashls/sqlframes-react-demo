const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

const options = [
  createTarget({ entry: 'index', outputType: 'amd-require', template: 'template', file: 'index' }),
  createTarget({ entry: 'wrapper_index', outputType: 'global', template: 'wrapper_template', file: 'wrapper_index' })
];

console.debug(options);

module.exports = options[1];

function createTarget({ entry, outputType, template, file }) {
  const options = 
{
  name: entry,
  // Where webpack looks to start building the bundle
  entry: paths.src + `/${entry}.js`,

  externals: {
    'node-fetch': { amd: 'node-fetch', global: 'fetch' },
    'requirejs': 'requirejs',
    'date-fns': { amd: 'date-fns', global: 'dateFns' },
    'preact': 'preact',
    'eta': { amd: 'eta', global: 'Eta' },
    'htm': 'htm',
    'dompurify': { amd: 'dompurify', global: 'DOMPurify' },
    'papaparse': 'papaparse',
    'monaco-editor': { amd: 'monaco-editor', global: 'monaco' },
    'echarts': 'echarts',
    '@yaireo/tagify': {amd: '@yaireo/tagify', global: 'Tagify' },
    'interactjs': { amd: 'interactjs', global: 'interact' },
    'lunr': 'lunr',
    'highlight.js/lib/core': {  amd: 'highlight.js/lib/core', global: 'hljs' },
    'highlight.js/lib/languages/sql': { amd: 'highlight.js/lib/languages/sql', global: 'hljsSql' },
    'cytoscape': 'cytoscape',
    'exceljs': { amd: 'exceljs', global: 'ExcelJS' },
  },
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    library: {
      type: outputType
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
      template: paths.src + `/${template}.html`, // template file
      filename: `${file}.html`, // output file
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
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
  return options;
}