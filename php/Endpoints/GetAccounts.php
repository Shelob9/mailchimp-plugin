<?php


namespace calderawp\CalderaMailChimp\Endpoints;

use calderawp\caldera\restApi\Authentication\WordPressUserJwt;
use calderawp\caldera\restApi\Exception;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use calderawp\interop\Contracts\Rest\Endpoint as EndpointContract;
use calderawp\interop\Contracts\Rest\RestRequestContract as Request;
use calderawp\interop\Contracts\Rest\RestResponseContract as Response;
use calderawp\interop\Contracts\TokenContract;
use calderawp\interop\Traits\Rest\ProvidesRestEndpoint;
class GetAccounts implements EndpointContract
{

	use ProvidesRestEndpoint,AuthorizesRequestByWpCap;
	/**
	 * @var CalderaMailChimp
	 */
	protected $module;

	/**
	 * @return CalderaMailChimp
	 */
	public function getModule(): CalderaMailChimp
	{
		return $this->module;
	}

	/**
	 * @param CalderaMailChimp $module
	 */
	public function setModule(CalderaMailChimp $module): GetAccounts
	{
		$this->module = $module;
		return $this;
	}



	/**
	 * @return string
	 */
	public function getUri(): string
	{
		return '/messages/mailchimp/accounts';
	}

	/**
	 * @return array
	 */
	public function getArgs(): array
	{
		return [
			'token'=>[
				'type' => 'string',
				'required' => true,
			]
		];
	}

	/**
	 * @return string
	 */
	public function getHttpMethod(): string
	{
		return 'GET';
	}

	/**
	 * @param Request $request
	 *
	 * @return RestResponseContract
	 */
	public function handleRequest(Request $request): Response
	{
		$accounts = $this->module->getDatabase()
			->getAccountDbApi()
			->getAll();


		return (new \calderawp\caldera\Http\Response() )->setData($accounts)
			->setStatus( ! empty($accounts) ? 200 : 404 );

	}

	/**
	 * @param Request $request
	 *
	 * @return TokenContract|string
	 */
	public function getToken(Request $request): string
	{
		return $request->getParam('token');
	}

	/**
	 * @return WordPressUserJwt
	 */
	public function getJwt(): WordPressUserJwt
	{
		return $this->module->getJwt();
	}


}
