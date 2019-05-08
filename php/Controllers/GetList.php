<?php


namespace calderawp\CalderaMailChimp\Controllers;


use something\Mailchimp\Entities\SingleList;

class GetList extends \something\Mailchimp\Controllers\GetList
{

	use HasModule;

	protected function findById(int $accountId): SingleList
	{
		return $this->getModule()->getDatabase()->getListsDbApi()->findById($accountId);
	}


}
