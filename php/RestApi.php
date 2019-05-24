<?php


namespace calderawp\CalderaMailChimp;


use calderawp\caldera\restApi\Authentication\WordPressUserJwt;
use calderawp\caldera\restApi\Traits\CreatesWordPressEndpoints;
use calderawp\CalderaMailChimp\Controllers\CreateAccount;
use calderawp\CalderaMailChimp\Controllers\CreateSubscriber;
use calderawp\CalderaMailChimp\Controllers\GetList;
use calderawp\CalderaMailChimp\Controllers\GetLists;
use calderawp\CalderaMailChimp\Controllers\UpdateAccount;
use calderawp\CalderaMailChimp\Endpoints\GenerateToken;
use calderawp\CalderaMailChimp\Endpoints\GetAccounts;
use calderawp\CalderaMailChimp\Endpoints\GetForm;
use calderawp\CalderaMailChimp\Endpoints\VerifyToken;
use calderawp\interop\Contracts\Rest\Endpoint;
use Mailchimp\MailchimpLists;

use something\Mailchimp\Controllers\UpdateSubscriber;
use calderawp\CalderaMailChimp\Endpoints\AddAccount as CreateAccountEndpoint;
use something\Mailchimp\Endpoints\GetList as GetListEndpoint;
use something\Mailchimp\Endpoints\GetLists as GetListsEndpoint;
use something\Mailchimp\Endpoints\UpdateAccount as UpdateAccountEndpoint;
use calderawp\CalderaMailChimp\Endpoints\UpdateSubscriber as UpdateSubscriberEndpoint;
use calderawp\CalderaMailChimp\Endpoints\AddSubscriber as AddSubscriberEndpoint;


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
	public function initApi(CalderaMailChimp $module)
	{

		$this->endpoints[ GetAccounts::class ] = (new GetAccounts())
            ->setModule($module)
			->setJwt($module->getJwt() );

		$this->endpoints[ CreateAccountEndpoint::class ] = (new CreateAccountEndpoint())
			->setJwt($module->getJwt() )
			->setController(
				(
				new CreateAccount($this->getMailchimpApi())
				)->setModule($module)
			);

		$this->endpoints[ UpdateAccountEndpoint::class ] = (new UpdateAccountEndpoint())
			->setController(
				(
				new UpdateAccount($this->getMailchimpApi())
				)->setModule($module)
			);

		$this->endpoints[ GetListEndpoint::class ] = (new GetListEndpoint())
			->setController(
				(
				new GetList($this->getMailchimpApi())
				)->setModule($module)
			);

		$this->endpoints[ GetListsEndpoint::class ] = (new GetListsEndpoint())
			->setController(
				(
				new GetLists($this->getMailchimpApi())
				)->setModule($module)
			);


		$this->endpoints[ AddSubscriberEndpoint::class ] = (new AddSubscriberEndpoint())
			->setController(
				(
				new CreateSubscriber($this->getMailchimpApi())
				)->setModule($module)
			);

		$this->endpoints[ UpdateSubscriberEndpoint::class ] = (new UpdateSubscriberEndpoint())
			->setController(
				(
				new UpdateSubscriber($this->getMailchimpApi())
				)
			);

        $this->endpoints[ GetForm::class ] = (new GetForm())
            ->setSubmitUrl( rest_url('/caldera-api/v1/messages/mailchimp/v1/lists/subscribe'))
            ->setModule($module);

        $this->endpoints[ GenerateToken::class ] = (new GenerateToken($this->getJwt()))
            ->setModule($module);

        $this->endpoints[ VerifyToken::class ] = (new VerifyToken($this->getJwt()))
            ->setModule($module);


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
