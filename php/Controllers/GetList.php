<?php


namespace calderawp\CalderaMailChimp\Controllers;


use something\Mailchimp\Controllers\FindGroups;
use something\Mailchimp\Controllers\FindMergeFields;
use something\Mailchimp\Entities\SingleList;

class GetList extends \something\Mailchimp\Controllers\GetList
{

	use HasModule;

	protected function findById(int $accountId): SingleList
	{
		$list = $this->getModule()->getDatabase()->getListsDbApi()->findById($accountId);
		if( ! $list->hasMergeFields() ){
			$mergeFields = (new FindMergeFields($this->getMailchimp()))
				->__invoke($list->getListId());

			$groupFields = (new FindGroups($this->getMailchimp()))
				->__invoke($list->getListId() );

		}
		return $list;
	}


}
