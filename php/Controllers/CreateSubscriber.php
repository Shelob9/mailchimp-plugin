<?php


namespace calderawp\CalderaMailChimp\Controllers;


use something\Mailchimp\Entities\SingleList;

class CreateSubscriber extends \something\Mailchimp\Controllers\CreateSubscriber
{

	use HasModule;

	/** @inheritdoc */
	public function getSavedList(string $listId): SingleList
	{
		return $this->getModule()->getDatabase()->getListsDbApi()->findByListId($listId);
	}


}
