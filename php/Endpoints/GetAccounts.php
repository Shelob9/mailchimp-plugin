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
		return '/messages/mailchimp/v1/accounts';
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
			],
			'asUiConfig' => [
				'type' => 'boolean',
				'default' => false,
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
		$status = ! empty($accounts) ? 200 : 404;
		if( $request->getParam('asUiConfig')){
			$field = [
				'fieldId' => 'caldera-mc-select-account',
				'fieldType' => 'select',
				'label' => 'Select Account',
				'options' => []
			];
			if( ! empty( $accounts ) ){
				$usedValues = [];
				foreach ( $accounts as $account ){
					if( in_array( $account['id'], $usedValues)){
						continue;
					}
					$usedValues[] = $account['id'];

					$field['options'][] = [
						'value' => $account['id'],
						'label' => $account['apiKey']
					];
				}
			}

			return (new \calderawp\caldera\Http\Response() )->setData($field)
				->setStatus( $status );


		}

		return (new \calderawp\caldera\Http\Response() )->setData($accounts)
			->setStatus( $status );

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
