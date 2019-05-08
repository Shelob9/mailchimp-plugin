<?php


namespace calderawp\CalderaMailChimp\Controllers;


use calderawp\CalderaMailChimp\CalderaMailChimp;
use something\Mailchimp\Controllers\MailchimpProxy;
use something\Mailchimp\Entities\Account;

class CreateAccount extends \something\Mailchimp\Controllers\CreateAccount
{

	use HasModule;


	protected function saveAccount(Account $account): Account
	{
		return $this->getModule()->getDatabase()->getAccountDbApi()->create($account);
	}


}
