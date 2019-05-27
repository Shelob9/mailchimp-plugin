/**
 * This file defines the configuration that is used for the production build.
 */
const { join } = require( 'path' );
console.log('client config!');

/**
 * Theme production build configuration.
 */
module.exports = {
	mode: 'production',
	devtool: 'hidden-source-map',
	context: process.cwd(),
	// Clean up build output
	stats: {
		all: false,
		assets: true,
		colors: true,
		errors: true,
		performance: true,
		timings: true,
		warnings: true,
	},


	// Optimize output bundle.
	optimization: {
		minimize: true,
		noEmitOnErrors: true,
		splitChunks: true,
	},

	// Specify where the code comes from.
	entry: {
		client: join( process.cwd(), 'src', 'client.js' ),
		front: join( process.cwd(), 'src', 'front.js' ),
	},
	output: {
		pathinfo: false,
		path: process.cwd() ,
		filename: '[name].js',
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				// Process JS with Babel.
				test: /\.js$/,
				include: [ join( process.cwd(), 'src' ) ],
				loader: require.resolve( 'babel-loader' ),
				options: {
					presets: ['@babel/preset-react'],
					plugins: ["@babel/plugin-transform-react-jsx"]

				}
			},
		],
	},
};
