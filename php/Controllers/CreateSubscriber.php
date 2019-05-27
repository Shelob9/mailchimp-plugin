<?php


namespace calderawp\CalderaMailChimp\Controllers;


use calderawp\caldera\restApi\Exception;
use something\Mailchimp\Entities\Account;
use something\Mailchimp\Entities\SingleList;
use something\Mailchimp\Entities\Subscriber;

class CreateSubscriber extends \something\Mailchimp\Controllers\CreateSubscriber
{

	use HasModule;

    /**
     * @inheritDoc
     */
    protected function prepareParams(Subscriber $subscriber, string $status): array
    {
        $params = parent::prepareParams($subscriber,$status);
        return apply_filters('calderaMailChimp/createSubscriber/params', $params, $subscriber );
    }


    /** @inheritdoc */
	public function getSavedList(string $listId): SingleList
	{
		$results = $this->getModule()->getDatabase()->getListsDbApi()->findByListId($listId);
		if( ! empty( $results  ) ){
		    return $results[0];
        }
		throw new Exception('Unknown list', 404 );
	}

	/** @inheritDoc */
    public function getSavedAccount(SingleList $list): Account
    {
        $results = $this->getModule()->getDatabase()->getAccountDbApi()->getById( $list->getAccountId() );
        if( ! empty( $results  ) ){
            return $results;
        }
        throw new Exception('Unknown Account', 404 );
    }


}
