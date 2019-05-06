<?php


namespace calderawp\CalderaMailChimp\Endpoints;

use calderawp\interop\Contracts\Rest\RestResponseContract as Response;
use calderawp\interop\Contracts\Rest\RestRequestContract as Request;


class SaveAccount extends GetLists
{
	/**
	 * @return array
	 */
	public function getArgs(): array
	{
		return [
			'token' => [
				'type' => 'string',
				'required' => true,
			],

		];
	}

	/**
	 * @return string
	 */
	public function getUri(): string
	{
		return '/messages/mailchimp/v1/accounts';
	}
	/**
	 * @return string
	 */
	public function getHttpMethod(): string
	{
		return 'POST';
	}

	/**
	 * @param Request $request
	 *
	 * @return RestResponseContract
	 */
	public function handleRequest(Request $request): Response
	{
		$apiKey = $request->getParam('apiKey');

		$response = parent::handleRequest($request);
		$lists = $response->getData();
		$accountId = $this->module->getDatabase()->getAccountsTable()
			->create(
				[
					'api_key' => strip_tags(trim($apiKey)),
					'data' => [
						'lists' => $lists,
						'fields' => [],
					],
				]
			);
		if (is_numeric($accountId)) {
			update_user_meta($this->user->ID, '_calderaMailChimpAccounts', $accountId);

			return (new \calderawp\caldera\Http\Response())
				->setStatus(201)
				->setData([
					'lists' => $lists,
					'accountId' => $accountId,
					'success' => true,
				]);

		}
		return (new \calderawp\caldera\Http\Response())
			->setStatus(201)
			->setData([
				'lists' => [],
				'accountId' => '',
				'success' => false,
			]);



	}

}
