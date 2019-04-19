<?php


namespace calderawp\CalderaMailChimp\Tests\Integration;

use calderawp\caldera\Core\CalderaCore;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use calderawp\CalderaMailChimp\Tests\TestCase;

abstract class IntegrationTestCase extends TestCase
{

	/**
	 * Get the module
	 *
	 * @return CalderaMailChimp
	 */
	protected function getModule() : CalderaMailChimp
	{
		return new CalderaMailChimp($this->getCore(), $this->getServiceContainer());
	}

	/**
	 * Get an instance of core
	 *
	 * @return CalderaCore
	 */
	protected function getCore() : CalderaCore
	{
		return new CalderaCore($this->getServiceContainer());
	}
}
