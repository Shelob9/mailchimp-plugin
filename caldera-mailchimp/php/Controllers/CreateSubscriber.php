<?php


namespace calderawp\CalderaMailChimp\Controllers;


use calderawp\caldera\restApi\Exception;
use something\Mailchimp\Entities\SingleList;

class CreateSubscriber extends \something\Mailchimp\Controllers\CreateSubscriber
{

	use HasModule;

	/** @inheritdoc */
	public function getSavedList(string $listId): SingleList
	{
		$results = $this->getModule()->getDatabase()->getListsDbApi()->findByListId($listId);
		if( ! empty( $results  ) ){
		    return $results[0];
        }
		throw new Exception('Unknown list', 404 );
	}


}
