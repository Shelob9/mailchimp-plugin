<?php


namespace calderawp\CalderaMailChimp\Controllers;


use calderawp\CalderaMailChimp\CalderaMailChimp;
use something\Mailchimp\Controllers\MailchimpProxy;

trait HasModule
{

	/**
	 * @var CalderaMailChimp
	 */
	private $module;

	/**
	 * @return CalderaMailChimp
	 */
	public function getModule(): CalderaMailChimp
	{
		return $this->module;
	}

	/**
	 * @param CalderaMailChimp $module
	 *
	 * @return MailchimpProxy
	 */
	public function setModule(CalderaMailChimp $module): MailchimpProxy
	{
		$this->module = $module;
		return $this;
	}
}
