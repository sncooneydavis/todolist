// webpack.dev.js
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		watchFiles: ["./src/template.html"],
		headers: {
			"Cross-Origin-Opener-Policy": "unsafe-none",
      "Cross-Origin-Embedder-Policy": "unsafe-none"
		}
	},
});