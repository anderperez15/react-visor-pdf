const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
  return merge([
      {
      	mode: process.env.NODE_ENV === 'production' ? "production" : "development",
        entry: ['@babel/polyfill', APP_DIR],
        output: {
			    filename: "main.js",
			    path: path.resolve(__dirname, "../build/"),
			    publicPath: "/",
			    globalObject: 'this'
			  },
        module: {
          rules: [
            {
			        test: /\.js$/,
			        exclude: /node_modules/,
			        use: {
			          loader: 'babel-loader'
			        }
			      },
			      {
			        test: /\.scss$/,
			        use: [
			          'style-loader',
			          'css-loader',
			          'sass-loader'
			        ]
			      },
			      {
			        test: /\.css$/,
			        use: [
			          'style-loader',
			          'css-loader'
			        ]
			      },
			      {
			  			test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
			  			exclude: /node_modules/,
			  			use: ['file-loader?name=[name].[ext]']
						}
          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.ico'
          }),
          new CopyWebpackPlugin([
					  {
					    from: 'node_modules/pdfjs-dist/cmaps/',
					    to: 'cmaps/'
					  }
					])
        ],
        devServer: {
			    "host": "localhost",
			    contentBase: "./public"
			  }
    }
  ])
};
