// webpack.dev.js
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const isDev = process.env.NODE_ENV === 'development';
export default merge(common, {
	mode: isDev ? 'development' : 'production',
	devtool: 'inline-source-map',
	devServer: {
		watchFiles: ["./src/template.html"],
	},
});