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
{


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
	 * @return bool
	 */
	public function authorizeRequest(Request $request): bool
	{
		if(empty($this->getToken($request))){
			return false;
		}
		try {
			/** @var \WP_User $user */
			$this->user = $this->getJwt()->userFromToken($this->getToken($request));
		} catch (AuthenticationException $e) {
			return false;
		} catch (UserNotFoundException $e) {
			return false;
		}
		return $this->user->has_cap( 'manage_options' );
	}

	/**
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function handleRequest(Request $request): Response
	{
		$apiKey = $request->getParam('apiKey');
		$saved = $this->module->getDatabase()->getAccountsTable()
			->findWhere('api_key',$apiKey);

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
						$response = $this->respondForUiField(array_values($data['lists']['lists']));
						if (200 === $response->getData()) {
							$this->module->getDatabase()->getAccountsTable()
								->update($saved[ 'id' ], [
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
