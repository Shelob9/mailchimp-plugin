<?php


namespace calderawp\CalderaMailChimp\Controllers;


use something\Mailchimp\Entities\Account;

class UpdateAccount extends \something\Mailchimp\Controllers\UpdateAccount
{
	use HasModule;

	protected function findAccountById(int $accountId): Account
	{
		return $this->getModule()->getDatabase()->getAccountsTable()->findById($accountId);
	}

	protected function saveAccount(Account $account): Account
	{
		return $this->getModule()->getDatabase()->getAccountsTable()->update($account->getId(), $account->toDbArray());
	}
}
