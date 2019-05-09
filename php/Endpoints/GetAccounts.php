<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\caldera\restApi\Authentication\WordPressUserJwt;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use calderawp\CalderaMailChimp\Controllers\HasModule;
use calderawp\interop\Contracts\Rest\RestRequestContract as Request;
use calderawp\interop\Contracts\Rest\RestResponseContract as Response;
use something\Mailchimp\Controllers\MailchimpProxy;
use something\Mailchimp\Entities\Account;

class GetAccounts extends \something\Mailchimp\Endpoints\GetAccounts
{
	use AuthorizesRequestByWpCap;

	/**
	 * @var WordPressUserJwt
	 */
	private $jwt;


    /**
     * @var CalderaMailChimp
     */
    private $module;

    /**
     * @return CalderaMailChimp
     */
    public function getModule(): CalderaMailChimp
    {
        return $this->module;
    }

    /**
     * @param CalderaMailChimp $module
     *
     * @return GetAccounts
     */
    public function setModule(CalderaMailChimp $module): GetAccounts
    {
        $this->module = $module;
        return $this;
    }


    /** @inheritdoc */
	public function handleRequest(Request $request): Response
	{

		$accounts = $this->getModule()->getDatabase()->getAccountDbApi()->getAll();
		if (!$request->getParam('asUiConfig')) {

            return new \calderawp\caldera\restApi\Response($accounts);
		}

		$accountUi = [
			'fieldType' => 'select',
			'fieldId' => 'mc-choose-account',
            'options' => [[
                'value' => null,
                'label' => ' --- '
            ]],
            'label' => 'Select Account'
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
		return (new \calderawp\caldera\restApi\Response() )->setData($accountUi);

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
