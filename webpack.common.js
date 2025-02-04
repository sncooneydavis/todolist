// webpack.common.js
import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	mode: 'development',
	entry: "./src/index.js",
	output: {
		filename: "scripts/[name].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
		}),
		new ESLintWebpackPlugin({ 
			extensions: ["js", "jsx"],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: { filename: "assets/images/[name][ext]", },
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: { filename: "assets/fonts/[name][ext]", },
			},
		],
	},
};