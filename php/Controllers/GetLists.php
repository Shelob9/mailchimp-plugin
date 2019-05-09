<?php


namespace calderawp\CalderaMailChimp\Controllers;


use Mailchimp\MailchimpLists;
use something\Mailchimp\Controllers\FindGroups;
use something\Mailchimp\Controllers\FindLists;
use something\Mailchimp\Controllers\FindMergeFields;
use something\Mailchimp\Entities\SingleList;

class GetLists extends \something\Mailchimp\Controllers\GetLists
{

	use HasModule;
	/** @inheritdoc */
	protected function getSavedLists(int $accountId): array
	{


		try {
			$lists = $this->getModule()->getDatabase()->getListsDbApi()->findByAccountId($accountId);
            if (! empty($lists)) {
                $account = $this->getModule()->getDatabase()->getAccountDbApi()->getById($accountId);
                $client = new MailchimpLists($account->getApiKey());
                $mergeFieldsClient = new FindMergeFields($client);
                $groupFieldsClient = new FindGroups($client);
                /** @var SingleList $list */
                foreach ($lists as $listIndex => $list) {
                    if( ! $list->getName() ){
                        $_list = $client->getList($list->getListId());
                    }
                    if (!$list->hasMergeFields()){
                        $list->setAccountId($accountId);
                        try{
                            $mergeFields = $mergeFieldsClient->getMergeVarsFromApi($list->getListId());
                            $list->setMergeFields($mergeFields);
                            try{
                                $groupFields = $groupFieldsClient->getGroupFieldsFromApi($list->getListId());
                                $list->setGroupFields($groupFields);

                            }catch (\Exception $e){
                                throw $e;
                            }
                            $lists[$listIndex] = $this->getModule()->getDatabase()->getListsDbApi()->update($list);


                        }catch (\Exception $e ){
                            throw $e;
                        }


                    }
                }
            }

            return $lists;
		} catch (\Exception $e) {
			throw $e;
		}
	}


}
