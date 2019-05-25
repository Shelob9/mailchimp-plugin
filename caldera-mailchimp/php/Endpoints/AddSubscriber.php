<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\CalderaMailChimp\Controllers\HasModule;

class AddSubscriber extends \something\Mailchimp\Endpoints\AddSubscriber
{
	protected function setList(string $listId): void
	{
		$this->list = $this->getController()->getSavedList($listId);
	}


}
