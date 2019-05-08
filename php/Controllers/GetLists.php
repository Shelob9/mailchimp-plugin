<?php


namespace calderawp\CalderaMailChimp\Controllers;


class GetLists extends \something\Mailchimp\Controllers\GetLists
{

	use HasModule;
	/** @inheritdoc */
	protected function getSavedLists(int $accountId): array
	{
		return $this->getModule()->getDatabase()->getListsDbApi()->findByAccountId($accountId);
	}


}
