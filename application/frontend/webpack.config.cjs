const webpack = require('webpack');
require('dotenv').config();

const path = require('path');

const app_dir = __dirname + '/src';
const sourcePath = path.join(process.cwd(), 'src');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: app_dir + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

const config = {
  mode: 'development',
  entry: app_dir + '/index.tsx',
  context: sourcePath,
  output: {
	path: path.resolve(__dirname + '/dist'),
	filename: 'assets/[name].[contenthash:6].js',
	chunkFilename: 'assets/[name].[chunkhash:6].js',
	publicPath: '/',
  },
  module: {
	rules: [
	  {
		test: /\.m\.less$/i,
		use: [
			process.env.NODE_ENV !== 'production'
			  ? 'style-loader'
			  : MiniCssExtractPlugin.loader,
			{
			  loader: 'css-loader',
			  options: {
				modules: {
				  localIdentName: '[name]__[local]--[hash:base64:5]',
				}
			  },
			},
			{
			  loader: 'less-loader',
			  options: {
				lessOptions: {
				  javascriptEnabled: true,
				  math: "always",
				},
			  },
			}
		  ],		  
	  },
	  {
		test: /\.less$/i,
		exclude: /\.m\.less$/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: "less-loader",
				options: {
				  lessOptions: {
					javascriptEnabled: true,
					math: "always",
				  },
				},
			},
		],
		sideEffects: true,
	  },
	  {
		test: /\.s?css$/,
		use: [
			'style-loader',
			'css-loader',
		]
	  },
	  {
		test: /\.tsx?$/,
		loader: "ts-loader",
		exclude: /(node_modules|bower_components)/
	  },
	  {
		test: /\.(woff|woff2|ttf|eot)$/,
		type: 'asset/resource',
		generator: {
		  filename: 'assets/fonts/[name][ext]'
		}
	  },
	  {
		test: /\.svg$/,
		issuer: /\.[jt]sx?$/,
		use: [
		  {
			loader: '@svgr/webpack',
			options: {
				icon: true,
			},
		  },
		  'url-loader'
		],
	  },				  
	  {
		test: /\.(jpe?g|png|gif)$/i,
		exclude: [/node_modules/],
		loader: "file-loader"
	  },
	]
  },
  plugins: [
		HTMLWebpackPluginConfig, 
		new MiniCssExtractPlugin({
			filename: 'assets/fonts.css',
		}),
		new webpack.DefinePlugin({
			'process.env.API_BASE_URL': JSON.stringify(
			  process.env.DEVELOP === 'true'
				? 'http://localhost:3000' // 👈 Dev server
				: process.env.API_BASE_URL || 'https://backend.railway.internal' // 👈 Fallback
			)
		})
	],
  resolve: {
	extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".less"]
  },
  optimization: {
	removeAvailableModules: false,
	removeEmptyChunks: false,
	splitChunks: false,
  },
  devServer: {
	port: 8080,
	hot: true,
	historyApiFallback: true,
	allowedHosts: 'all',
  },
};
module.exports = config;
