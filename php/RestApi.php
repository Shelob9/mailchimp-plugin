<?php


namespace calderawp\CalderaMailChimp;


use calderawp\caldera\restApi\Traits\CreatesWordPressEndpoints;
use calderawp\interop\Contracts\Rest\Endpoint;
use Mailchimp\MailchimpLists;
use something\Mailchimp\Endpoints\AddSubscriber;
use something\Mailchimp\Controllers\CreateSubscriber;
use something\Mailchimp\Endpoints\GetList;
use something\Mailchimp\Endpoints\GetLists;

class RestApi
{
	use CreatesWordPressEndpoints;

	/**
	 * @var callable
	 */
	protected $registerFunction;

	/**
	 * @var string
	 */
	protected $namespace;

	/**
	 * @var Endpoint[]
	 */
	protected $endpoints;

	/**
	 * @var MailchimpLists
	 */
	protected $mailchimpApi;
	public function __construct(callable $registerFunction,string $namespace)
	{
		$this->registerFunction = $registerFunction;
		$this->namespace = $namespace;
		$this->endpoints = [];

	}

	/**
	 * @return MailchimpLists
	 */
	public function getMailchimpApi(): MailchimpLists
	{
		return $this->mailchimpApi;
	}

	/**
	 * @param MailchimpLists $mailchimpApi
	 */
	public function setMailchimpApi(MailchimpLists $mailchimpApi): void
	{
		$this->mailchimpApi = $mailchimpApi;
	}

	/**
	 * Register an endpoint with WordPress
	 *
	 * @param Endpoint $endpoint
	 */
	public function registerRouteWithWordPress(Endpoint $endpoint)
	{
		register_rest_route( $this->getNamespace(), $endpoint->getUri(), $this->wpArgs($endpoint));
	}

	/**
	 * Register endpoints
	 */
	public function initApi()
	{
		$this->endpoints[AddSubscriber::class] = (new AddSubscriber())->setController(new CreateSubscriber($this->getMailchimpApi()));
		$this->endpoints[GetList::class] = (new GetList())->setController(new \something\Mailchimp\Controllers\GetList($this->getMailchimpApi()));
		$this->endpoints[GetLists::class] = (new AddSubscriber())->setController(new \something\Mailchimp\Controllers\GetLists($this->getMailchimpApi()));
		/** @var Endpoint $endpoint */
		foreach ($this->endpoints as $endpoint ){
			$this->registerRouteWithWordPress($endpoint);
		}
	}

	/**
	 * @return array|Endpoint[]
	 */
	public function getEndpoints() : array
	{
		return $this->endpoints;
	}
}
