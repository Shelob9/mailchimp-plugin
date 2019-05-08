<?php
/**
 * Plugin Name: Caldera MailChimp
 * Version: 2.0.0-a.1
 */




/**
 * Setup admin page as a sub-menu item of Caldera Forms with a React app for the UI
 */
add_action( 'CalderaMailChimp', function(\calderawp\CalderaMailChimp\CalderaMailChimp $module){
	add_action( 'rest_api_init', function() use ($module){
		$apiKey = apply_filters( 'caldera/mailchimp/apiKey', '' );
		$httpClient = new \GuzzleHttp\Client();
		$mailChimpClient = new \something\Mailchimp\HttpClient();
		$mailChimpClient->setGuzzle($httpClient);
		$mailchimpApi = new \Mailchimp\MailchimpLists($apiKey, 'apiuser', [],$mailChimpClient);
		$api = new \calderawp\CalderaMailChimp\RestApi(
			'register_rest_route',
			'caldera-api/v1'
		);
		$api->setJwt($module->getJwt());
		$api->setMailchimpApi($mailchimpApi);
		$api->initApi($module);
		$module->getTokenApi()->initTokenRoutes();
	});




});

/**
 * Load module with Caldera Framework
 */
add_action('plugins_loaded', function () {

	//include autoloader
	include_once __DIR__ . '/vendor/autoload.php';

	$module = new \calderawp\CalderaMailChimp\CalderaMailChimp(
		site_url(),
		'12345',
		new \calderawp\caldera\restApi\Authentication\WordPressUserFactory()
	);
	/**
	 * Action that fires after the CalderaMailChimp module is loaded in WordPress
	 */
	do_action( 'CalderaMailChimp', $module );
});

add_action( 'CalderaMailChimp', function( \calderawp\CalderaMailChimp\CalderaMailChimp $module){
	\calderawp\CalderaMailChimp\Scripts\setup();

	add_action( 'enqueue_block_editor_assets', function() use ($module){
		wp_localize_script('caldera-mailchimp', 'CALDERA_MAILCHIMP', [
			'token' => esc_attr($module->getCurrentUserToken()),
			'apiRoot' => esc_url_raw(rest_url('/caldera-api/v1/messages/mailchimp/v1'))
		]);
	},25 );



	register_block_type('caldera-mailchimp/signup',
		[

			'render_callback' => function($atts){
			if( ! isset($atts['listId'] )){
				$atts['listId' ] = '45907f0c59';
				//return;
			}
			return sprintf('<div class="%" data-list-id="%s"></div>', 'calderaMailchimp', esc_attr($atts['listId']));
			}
		]);
},10);






