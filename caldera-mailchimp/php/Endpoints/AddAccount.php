<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\caldera\restApi\Authentication\WordPressUserJwt;

class AddAccount extends \something\Mailchimp\Endpoints\AddAccount
{

	use AuthorizesRequestByWpCap;

	private $jwt;

	public function setJwt(WordPressUserJwt $jwt) : AddAccount
	{
		$this->jwt = $jwt;
		return $this;
	}
	 public function getJwt( ): WordPressUserJwt
	 {
	 	return $this->jwt;
	 }

}
