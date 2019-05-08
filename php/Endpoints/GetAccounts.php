<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\caldera\restApi\Authentication\WordPressUserJwt;
use calderawp\CalderaMailChimp\Controllers\HasModule;
use calderawp\interop\Contracts\Rest\RestRequestContract as Request;
use calderawp\interop\Contracts\Rest\RestResponseContract as Response;
use something\Mailchimp\Entities\Account;

class GetAccounts extends \something\Mailchimp\Endpoints\GetAccounts
{
	use HasModule,AuthorizesRequestByWpCap;

	/**
	 * @var WordPressUserJwt
	 */
	private $jwt;
	/** @inheritdoc */
	public function handleRequest(Request $request): Response
	{

		$accounts = $this->getModule()->getDatabase()->getAccountDbApi()->getAll();
		if (! $request->getParam('asUiConfig')) {
			return new \calderawp\caldera\restApi\Response($accounts);
		}

		$accountUi = [
			'fieldType' => 'select',
			'fieldId' => 'mc-choose-account',
			'options' => []
		];
		if (! empty($accounts) ) {
			/** @var Account $account */
			foreach ($accounts as $account ){
				$accountUi['options'][]=[
					'value' => $account->getId(),
					'label' => $account->getNameOrId()
				];
			}
		}
		return new \calderawp\caldera\restApi\Response($accountUi);

	}




	public function setJwt(WordPressUserJwt $jwt) : GetAccounts
	{
		$this->jwt = $jwt;
		return $this;
	}
	public function getJwt( ): WordPressUserJwt
	{
		return $this->jwt;
	}

}
