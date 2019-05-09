<?php


namespace something\Mailchimp\Controllers;



use something\Mailchimp\Entities\MergeVars;

class FindMergeFields extends MailchimpProxy
{
	/**
	 * @param string $listId
	 *
	 * @return array
	 */
	public function __invoke(string $listId)
	{
		$r = $this
			->getMailchimp()
			->getMergeFields($listId);
		$mergeFields =  isset($r->merge_fields) ? $r->merge_fields : [];
		$mergeFields = MergeVars::fromArray($mergeFields);
		$mergeFields->setListId($listId);
		return [
			'listId' => $listId,
			'mergeFields' =>$mergeFields,
		];
	}
}
