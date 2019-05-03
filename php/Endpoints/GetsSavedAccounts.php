<?php


namespace calderawp\CalderaMailChimp\Endpoints;


trait GetsSavedAccounts
{

	/**
	 * @param $apiKey
	 *
	 * @return array
	 * @throws \calderawp\DB\Exceptions\InvalidColumnException
	 */
	protected function getSavedAccountsByApiKey($apiKey): array
	{
		$savedAccounts = $this->module->getDatabase()->getAccountsTable()->findWhere('api_key', $apiKey);
		return $savedAccounts;
	}
}
