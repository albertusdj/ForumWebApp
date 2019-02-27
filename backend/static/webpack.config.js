const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
  	login: './src/js/login-page/login.js'
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