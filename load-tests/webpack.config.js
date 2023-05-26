const DotenvWebpackPlugin = require('dotenv-webpack');
const path = require("path")

module.exports = {
	resolve: {
		extensions: [".ts", ".js", ".mjs"],
	},
	mode: "development",
	entry: {
		index: "./src/index.ts",
	},
	output: {
		path: path.resolve(__dirname, "dist"),

		libraryTarget: "commonjs",

		filename: "[name].js",
	},

	module: {
		rules: [
			{
				test: /\.ts$/,

				//exclude: /node_modules/,

				loader: "babel-loader",

				options: {
					presets: [["@babel/typescript"]],

					plugins: ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"],
				},
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
				use: {
					loader: 'babel-loader',
					options: {
					  presets: ['@babel/preset-env']
					}
				}
			}
		],
	},

	stats: {
		colors: true,
	},

	// target: 'web',

	externals: /k6(\/.*)?/,

	devtool: "source-map",

	node: {
		fs: 'empty',
	},

	plugins: [
		new DotenvWebpackPlugin()
	  ]
}
