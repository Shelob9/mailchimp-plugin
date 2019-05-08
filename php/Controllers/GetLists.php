<?php


namespace calderawp\CalderaMailChimp\Controllers;


class GetLists extends \something\Mailchimp\Controllers\GetLists
{

	use HasModule;
	/** @inheritdoc */
	protected function getSavedLists(int $accountId): array
	{
		try {
			$lists = $this->getModule()->getDatabase()->getListsDbApi()->findByAccountId($accountId);
			return $lists;
		} catch (\Exception $e) {
			throw $e;
		}
	}


}
