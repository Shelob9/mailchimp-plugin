<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\caldera\restApi\Authentication\AuthenticationException;
use calderawp\caldera\restApi\Authentication\UserNotFoundException;
use calderawp\caldera\restApi\Authentication\WordPressUserJwt;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use calderawp\interop\Contracts\Rest\RestRequestContract as Request;
use calderawp\interop\Contracts\Rest\RestResponseContract as Response;
use Mailchimp\MailchimpAPIException;
use something\Mailchimp\Entities\Groups;
use something\Mailchimp\Entities\MergeVars;
use something\Mailchimp\Entities\SingleList;

class GetList extends \something\Mailchimp\Endpoints\GetList
{
	use GetsSavedList, GetsSavedAccounts;

	/**
	 * @var CalderaMailChimp
	 */
	protected $module;

	/**
	 * @var \WP_User
	 */
	protected $user;

	/** @var int */
	protected $listAccountId;

	/**
	 * @return WordPressUserJwt
	 */
	public function getJwt(): WordPressUserJwt
	{
		return $this->module->getJwt();
	}


	/** @inheritdoc */
	public function setModule(CalderaMailChimp $module): GetList
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
		if (empty($this->getToken($request))) {
			return false;
		}
		try {
			$this->user = $this->getJwt()->userFromToken($this->getToken($request));
		} catch (AuthenticationException $e) {
			return false;
		} catch (UserNotFoundException $e) {
			return false;
		}
		$apiKey = $request->getParam('apiKey');
		if (is_numeric($apiKey)) {
			return $this->userCanAccess($this->user, $request->getParam('apiKey'));
		}
		$savedLists = $this->module->getDatabase()->getListsTable()->findWhere('api_key', $apiKey);
		if (!empty($savedLists)) {
			foreach ($savedLists as $list) {
				if ($this->userCanAccess($this->user, $list[ 'id' ])) {
					$this->listAccountId = $list[ 'id' ];
					$request->setParam('apiKey', $list[ 'api_key' ]);
					return true;
				}

			}
		}
		return false;
	}


	/**
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function handleRequest(Request $request): Response
	{
		$apiKey = $request->getParam('apiKey');
		$listId = $request->getParam('listId');
		$entity = $this->getSavedList($listId);
		if (!$entity) {

			$listName = '';
			if (!$this->listAccountId) {
				$savedAccounts = $this->getSavedAccountsByApiKey($apiKey);
				if (!empty($savedAccounts)) {
					foreach ($savedAccounts as $list) {
						if ($apiKey === $list[ 'api_key' ]) {
							$this->listAccountId = $list[ 'id' ];
						}
					}
				}
			}
			try {
				$list = $this->getController()->__invoke($request->getParam('listId'));
				$savedAccounts = $this->getSavedAccountsByApiKey($apiKey);
				if (!empty($savedAccounts)) {
					$lists = unserialize($savedAccounts[ 0 ][ 'data' ]);
					foreach ($lists as $_list) {
						if (isset($_list['lists'])) {
							$_list = $_list[ 'lists' ];
							if ($_list) {
								/** @var SingleList $l */
								foreach ($_list as $l) {
									if (is_object($l)) {
										if ($listId === $l->getListId()) {
											$listName = $l->getName();
											break;
										}
									}
								}
							}
						}
					}

				}
				$entity = $list[ 'entity' ];
				$entity->setName($listName);
				$listDbId = $this->module->getDatabase()->getListsTable()->create(
					[
						'account_id' => $this->listAccountId,
						'list_id' => $listId,
						'data' => $list[ 'entity' ]->toArray(),
					]
				);


			} catch (MailchimpAPIException $e) {
				return $this->exceptionToResponse($e);
			}
		}


		if ($request->getParam('asUiConfig')) {
			return (new \something\Mailchimp\Endpoints\Response())->setStatus(
				200)
				->setData($entity->toUiFieldConfig()
				);
		}

		return (new \something\Mailchimp\Endpoints\Response())->setStatus(200)->setData($entity->toArray());
	}


	protected function userCanAccess(\WP_User $user, int $accountId)
	{
		$allowed = get_user_meta($user->ID, '_calderaMailChimpAccounts');
		return is_array($allowed) && in_array((string)$accountId, $allowed);
	}




}
