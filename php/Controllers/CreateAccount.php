<?php


namespace calderawp\CalderaMailChimp\Controllers;


use calderawp\CalderaMailChimp\CalderaMailChimp;
use Mailchimp\MailchimpLists;
use something\Mailchimp\Controllers\FindLists;
use something\Mailchimp\Controllers\MailchimpProxy;
use something\Mailchimp\Entities\Account;
use something\Mailchimp\Entities\SingleList;

class CreateAccount extends \something\Mailchimp\Controllers\CreateAccount
{

	use HasModule;

    /**
     * @param string $apiKey
     * @return Account
     * @throws \Exception
     */
	public function __invoke(string $apiKey ): Account
	{
		$this->setMailchimp( new MailchimpLists($apiKey));
		$r = $this
			->getMailchimp()
			->getAccount(['apiKey' => $apiKey ]);
		if( ! empty( $r ) ){

			$account =  Account::fromArray([
				'mailChimpAccountId' => $r->account_id,
				'name' => $r->account_name,
				'apiKey' => $apiKey,
			]);

			try {
				$account = $this->saveAccount($account);
				return $account;
			} catch (\Exception $e) {
				throw $e;
			}
		}

	}

	protected function saveAccount(Account $account): Account
	{
		try {
			$account = $this->getModule()->getDatabase()->getAccountDbApi()->create($account);
			$lists = (new FindLists($this->getMailchimp()))->__invoke($account->getId());
			if( ! empty( $lists ) ){
				/** @var SingleList $list */
				foreach ( $lists as $list ){
					$list->setAccountId($account->getId());
					try {
						$this->getModule()->getDatabase()->getListsDbApi()->create($list->toDbArray());
					} catch (\Exception $e) {
						throw $e;
					}
				}
			}
			return $account;
		return $account;
		} catch (\Exception $e) {
			throw $e;
		}

	}


}
