<?php


namespace calderawp\CalderaMailChimp\Endpoints;
use calderawp\caldera\restApi\Exception;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use calderawp\DB\Exceptions\InvalidColumnException;

class UpdateSubscriber extends \something\Mailchimp\Endpoints\UpdateSubscriber
{
	use GetsSavedList;

	/**
	 * @var CalderaMailChimp
	 */
	protected $module;

	/**
	 * @return CalderaMailChimp
	 */
	public function getModule(): CalderaMailChimp
	{
		return $this->module;
	}

	/**
	 * @param CalderaMailChimp $module
	 */
	public function setModule(CalderaMailChimp $module): UpdateSubscriber
	{
		$this->module = $module;
		return $this;
	}


	/**
	 * @param string $listId
	 *
	 * @throws Exception
	 * @throws InvalidColumnException|\calderawp\caldera\restApi\Exception
	 */
	protected function setList(string $listId): void
	{
		try {
			$this->list = $this->getSavedList($listId);
			return;
		} catch (InvalidColumnException $e) {
			throw  $e;
		}
		throw new Exception( 404, 'not found');
	}
}
