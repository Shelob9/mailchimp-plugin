<?php

namespace calderawp\CalderaMailChimp\Tests\Integration;

class CalderaMailChimpTest extends IntegrationTestCase
{

	/**
	 * @covers \calderawp\CalderaMailChimp\CalderaMailChimp::getIdentifier()
	 */
	public function testGetIdentifier()
	{
		$this->assertIsString($this->getModule()->getIdentifier());
	}

	/**
	 * @covers \calderawp\CalderaMailChimp\CalderaMailChimp::registerServices()
	 */
	public function testRegisterServices()
	{
		$this->assertIsString($this->getModule()->getIdentifier());
	}
}
