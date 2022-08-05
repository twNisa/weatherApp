const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:{
    app: "./src/app.js",
    // convert: "./src/convert.js",
    // data: "./src/data.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Weather App - dev',
      inject: "body",
      template: "./src/index.html",
      filename: "index.html"
    }),
  ],
  output:{
    filename:"[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module:{
    rules: [
      {
        test: /\.css$/i,
        use:['style-loader', 'css-loader'],
      },
    ],
  },
  optimization:{
    runtimeChunk: "single",
  },
}