<?php


namespace calderawp\CalderaMailChimp;


use calderawp\caldera\restApi\Authentication\WordPressUserJwt;
use calderawp\caldera\restApi\Traits\CreatesWordPressEndpoints;
use calderawp\CalderaMailChimp\Endpoints\AddSubscriber;
use calderawp\CalderaMailChimp\Endpoints\GetForm;
use calderawp\CalderaMailChimp\Endpoints\GetList;
use calderawp\CalderaMailChimp\Endpoints\GetLists;
use calderawp\interop\Contracts\Rest\Endpoint;
use Mailchimp\MailchimpLists;

use something\Mailchimp\Controllers\CreateSubscriber as CreateSubscriptionController;
use \something\Mailchimp\Controllers\GetList as GetListController;
use \something\Mailchimp\Controllers\GetLists as GetListsController;

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
	 * @var WordPressUserJwt
	 */
	protected $jwt;

	/**
	 * @var MailchimpLists
	 */
	protected $mailchimpApi;

	public function __construct(callable $registerFunction, string $namespace)
	{
		$this->registerFunction = $registerFunction;
		$this->namespace = $namespace;
		$this->endpoints = [];

	}

	/**
	 * @return WordPressUserJwt
	 */
	public function getJwt(): WordPressUserJwt
	{
		return $this->jwt;
	}

	/**
	 * @param WordPressUserJwt $jwt
	 *
	 * @return RestApi
	 */
	public function setJwt(WordPressUserJwt $jwt): RestApi
	{
		$this->jwt = $jwt;
		return $this;
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
		register_rest_route($this->getNamespace(), $endpoint->getUri(), $this->wpArgs($endpoint));
	}

	/**
	 * Register endpoints
	 */
	public function initApi(CalderaMailChimp$module)
	{
		$this->endpoints[ AddSubscriber::class ] = (new AddSubscriber())
			->setModule($module)
			->setController(
				new CreateSubscriptionController(
					$this->getMailchimpApi()
				)
			);
		$this->endpoints[ GetList::class ] = (new GetList())
			->setModule($module)
			->setController(
				new GetListController(
					$this->getMailchimpApi()
				)
			);

		$this->endpoints[GetForm::class] = (new GetForm() )
			->setModule($module)
			->setController(
				new GetListController(
					$this->getMailchimpApi()
				)
			);

		$this->endpoints[ GetLists::class ] = (new GetLists())
			->setModule($module)
			->setController(
				new GetListsController(
					$this->getMailchimpApi()
				)
			);
		/** @var Endpoint $endpoint */
		foreach ($this->endpoints as $endpoint) {
			$this->registerRouteWithWordPress($endpoint);
		}
	}

	/**
	 * @return array|Endpoint[]
	 */
	public function getEndpoints(): array
	{
		return $this->endpoints;
	}
}
