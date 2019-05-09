<?php
/**
 * Register scripts in development and production.
 */
namespace calderawp\CalderaMailChimp\Scripts;

use calderawp\CalderaMailChimp\Asset_Loader;

function setup() {

	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
	add_action( 'wp_enqueue_scripts', function(){
		$plugin_path  = trailingslashit( plugin_dir_path( dirname( __FILE__ ) ) );
		$plugin_url   = trailingslashit( plugin_dir_url( dirname( __FILE__ ) ) );

        $src = $plugin_url . 'build/front.js';
        $src = 'https://localhost:3030/build/front.js';
        wp_enqueue_script('caldera-mailchimp-front',
            $src,
            [],
            filemtime( $plugin_path . 'build/editor.js' ),
            true
        );


});
}



/**
 * Enqueue editor assets based on the generated `asset-manifest.json` file.
 *
 *
 */
function enqueue_block_editor_assets()
{
	$plugin_path  = trailingslashit( plugin_dir_path( dirname( __FILE__ ) ) );
	$plugin_url   = trailingslashit( plugin_dir_url( dirname( __FILE__ ) ) );
	$dev_manifest = $plugin_path . 'build/asset-manifest.json';

	$opts = [
		'handle' => 'caldera-mailchimp',
		'scripts' => [
			'wp-blocks',
			'wp-data',
			'wp-edit-post',
			'wp-element',
			'wp-i18n',
			'wp-plugins',
		],
	];


	$loaded_dev_assets = Asset_Loader\enqueue_assets( $dev_manifest, $opts );
	//$loaded_dev_assets = false;
	if ( ! $loaded_dev_assets ) {
		// Production mode. Manually enqueue script bundles.
		if ( file_exists( $plugin_path . 'build/editor.js' ) ) {
			wp_enqueue_script(
				$opts['handle'],
				$plugin_url . 'build/editor.js',
				$opts['scripts'],
				filemtime( $plugin_path . 'build/editor.js' ),
				true
			);
		}
		// TODO: Error if file is not found.

		if ( file_exists( $plugin_path . 'build/editor.css' ) ) {
			wp_enqueue_style(
				$opts['handle'],
				$plugin_url . 'build/editor.css',
				null,
				filemtime( $plugin_path . 'build/editor.css' )
			);
		}
	}


}
