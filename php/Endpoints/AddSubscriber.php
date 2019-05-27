<?php


namespace calderawp\CalderaMailChimp\Endpoints;



use calderawp\interop\Contracts\Rest\RestRequestContract as Request;
use calderawp\interop\Contracts\Rest\RestResponseContract as Response;

class AddSubscriber extends \something\Mailchimp\Endpoints\AddSubscriber
{
	protected function setList(string $listId): void
	{
		$this->list = $this->getController()->getSavedList($listId);
	}


}
