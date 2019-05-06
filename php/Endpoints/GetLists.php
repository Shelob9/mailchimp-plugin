<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\caldera\restApi\Authentication\AuthenticationException;
use calderawp\caldera\restApi\Authentication\UserNotFoundException;
use calderawp\caldera\restApi\Authentication\WordPressUserJwt;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use calderawp\DB\Time;
use calderawp\interop\Contracts\Rest\RestRequestContract as Request;
use calderawp\interop\Contracts\Rest\RestResponseContract as Response;
use something\Mailchimp\Entities\Lists;

class GetLists extends \something\Mailchimp\Endpoints\GetLists
{	use GetsSavedAccounts;


	/**
	 * @var \WP_User
	 */
	protected $user;
	/**
	 * @var CalderaMailChimp
	 */
	protected $module;

	/**
	 * @return WordPressUserJwt
	 */
	public function getJwt(): WordPressUserJwt
	{
		return $this->module->getJwt();
	}


	public function setModule( CalderaMailChimp $module ): GetLists
	{
		$this->module = $module;
		return $this;
	}




	/**
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function handleRequest(Request $request): Response
	{
		$apiKey = $request->getParam('apiKey');
		if( is_numeric( $apiKey ) ){
			$_saved = $this->module->getDatabase()
				->getAccountDbApi()
				->getByAccountId($apiKey);
			if( ! empty( $_saved) ){
				$apiKey = $_saved[0]['apiKey'];
			}
		}
		$saved = $this->getSavedAccountsByApiKey($apiKey);

		if (empty($saved)) {
			$response =  parent::handleRequest($request);
			$accountId = $this->module->getDatabase()->getAccountsTable()
				->create(
					[
						'api_key' => $apiKey,
						'data' => [
							'lists' => $response->getData(),
							'fields' => []
						]
					]
				);
			if( is_numeric($accountId)){
				update_user_meta($this->user->ID, '_calderaMailChimpAccounts', $accountId );
			}
		} else {
			$saved = $saved[0];
			$lastUpdated = Time::dateTimeFromMysql($saved['updated']);
			$data = unserialize($saved['data']);
			$lists = isset( $data['lists'] )  ? $data['lists'] : [];
			if( ! empty( $lists) && $lastUpdated->getTimestamp() < strtotime('2 days ago' ) ){
				$response =  parent::handleRequest($request);

				$this->module->getDatabase()->getAccountsTable()
					->update($saved['id'],[
						[
							'api_key' => $apiKey,
							'data' => [
								'lists' => $response->getData(),
								'fields' => [],//reset fields every time lists change,
								'updated' => current_time('mysql')
							]
						]
					]);
			}else{
				if( $request->getParam('asUiConfig')){
					if (! empty($data[ 'fields' ])) {
						return (new \something\Mailchimp\Endpoints\Response())->setStatus(200 )->setData($data['fields'] );
					}else{
						foreach ($data['lists'] as $listId => $list ){
							$list['list_id']= $listId;
						}
						$lists = array_values($data['lists']['lists']);
						$lists = Lists::fromArray($lists);
						$response = $this->respondForUiField($lists);
						if (200 === $response->getStatus()) {
							$updateId = $this->module->getDatabase()->getAccountsTable()
								->update((int)$saved[ 'id' ], [
									[
										'api_key' => $apiKey,
										'data' => [
											'lists' => $data[ 'lists' ],
											'fields' => $response->getData(),
										],
										'updated' => current_time('mysql')
									],
								]);
						}
						return $response;
					}


				}
				return (new \something\Mailchimp\Endpoints\Response())->setStatus(200 )->setData($lists );

			}
		}
		return $response;
	}


}
