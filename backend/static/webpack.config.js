const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
		login: './src/js/login-page/login.js',
		register: './src/js/register-page/register.js',
		navbar: './src/js/component/navbar.js',
		ask: './src/js/ask-page/ask.js',
		index: './src/js/index-page/index.js',
		detail: './src/js/detail-page/detail.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CleanWebpackPlugin(['dist'])
	],
  devtool: 'inline-source-map',
  module: {
  	rules: [
  		{
	  		test: /\.css$/,
	  		use: [
	  			'style-loader',
	  			'css-loader'
	  		]
	  	},
	  	{
	  		test: /\.(png|svg|jpg|gif)$/,
	  		use: [
	  			'file-loader'
	  		]
	  	},
	  	{
	  		test: /\.js$/,
	  		exclude: /node_modules/,
	  		loader: 'babel-loader'
	  	}
  	]
  }
};