<?php


namespace calderawp\CalderaMailChimp\Tests;

use calderawp\CalderaContainers\Service\Container;

abstract class TestCase extends \Mockery\Adapter\Phpunit\MockeryTestCase
{


	/**
	 * Get a service container
	 *
	 * @return Container
	 */
	protected function getServiceContainer() : Container
	{
		return new Container();
	}
}
