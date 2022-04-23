const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


let htmlPageNames = ['apply', 'link_bank_acct', 'login_setup', 'transaction', 'user', 'view_edit_user'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
    mode: 'production',
    // entry: "./src/index.js", // bundle's entry point
    entry: {
        "main":"./src/index.js",
        "apply": "./src/index.js",
        "link_bank_acct": "./src/index.js",
        "login_setup": "./src/index.js",
        "transaction": "./src/index.js",
        "user": "./src/index.js",
        "view_edit_user": "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // output directory
        filename: "[name].js" // name of the generated bundle
    },
    module: {
      rules: [
          {
              test: /\.css$/,
              use: ["style-loader","css-loader"]
          }
      ]
    } ,
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          chunks: ['main']
        })
    ].concat(multipleHtmlPlugins)
};

