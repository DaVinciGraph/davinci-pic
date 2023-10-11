const path = require("path");

module.exports = {
	// mode: "development",
	entry: "./src/index.ts",
	output: {
		filename: "standalone/index.js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		compress: true,
		port: 9000,
	},
	optimization: {
		minimize: true,
		minimizer: [
			(compiler) => {
				const TerserPlugin = require("terser-webpack-plugin");
				new TerserPlugin({
					terserOptions: {
						output: {
							comments: false, // Remove comments
						},
					},
					extractComments: false, // Remove comments in a separate file (if any)
				}).apply(compiler);
			},
		],
	},
};
