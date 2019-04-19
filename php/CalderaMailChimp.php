<?php


namespace calderawp\CalderaMailChimp;

use calderawp\interop\Contracts\CalderaModule;
use calderawp\CalderaMailChimp\Contracts\ModuleNameContract;
use calderawp\CalderaContainers\Service\Container as ServiceContainer;
use calderawp\interop\Module;

/**
 * Class CalderaMailChimp
 *
 *  The CalderaMailChimp module for use with the Caldera Framework
 */
final class CalderaMailChimp extends Module implements ModuleNameContract
{
	/**
	 * The string identifier for this module
	 *
	 * @var string
	 */
	const IDENTIFIER  = 'CalderaMailChimp';
	/** @inheritdoc */
	public function getIdentifier(): string
	{
		return self::IDENTIFIER;
	}
	/** @inheritdoc */
	public function registerServices(ServiceContainer $container): CalderaModule
	{
		return $this;
	}
}
