<?php


namespace calderawp\CalderaMailChimp;

use calderawp\caldera\restApi\Authentication\WordPressUserFactory;
use calderawp\caldera\restApi\Authentication\WordPressUserJwt;
use calderawp\caldera\restApi\Authentication\WpRestApi;
use calderawp\interop\Contracts\CalderaModule;
use calderawp\CalderaContainers\Service\Container as ServiceContainer;
use something\Mailchimp\Database\Database;

final class CalderaMailChimp
{

	/** @var Database  */
	protected $database;

	/**
	 * @var WordPressUserJwt
	 */
	protected $jwt;


	/**
	 * @var \WP_User
	 */
	protected $user;

	/**
	 * @var WpRestApi
	 */
	protected $tokenApi;

	protected $userFactory;

	/** @inheritdoc */
	public function __construct(string $siteUrl, string $jwtSecret, WordPressUserFactory $userFactory,Database $database = null )
	{
		$this->userFactory = $userFactory;
		$this->jwt = new WordPressUserJwt($this->userFactory,$jwtSecret,$siteUrl);

		$this->initDatabase($database);

		$this->tokenApi = (new WpRestApi($this->getJwt(),$siteUrl) );

	}

	public function getCurrentUser()
	{
		if( ! $this->user ){
			$this->user = $this->userFactory->byId(get_current_user_id());
		}
		return $this->user;
	}


	/**
	 * @return Database
	 */
	public function getDatabase(): Database
	{
		return $this->database;
	}

	/**
	 * @param Database $database
	 *
	 * @return CalderaMailChimp
	 */
	public function setDatabase(Database $database): CalderaMailChimp
	{
		$this->database = $database;
		return $this;
	}

	/**
	 * @return WordPressUserJwt
	 */
	public function getJwt(): WordPressUserJwt
	{
		return $this->jwt;
	}

	/**
	 * @return WpRestApi
	 */
	public function getTokenApi(): WpRestApi
	{
		return $this->tokenApi;
	}



	/**
	 * @param Database $database
	 *
	 * @throws \WpDbTools\Exception\RuntimeException
	 */
	protected function initDatabase(Database $database = null )
	{
		if (!$database) {
			$this->database = new Database(new \calderawp\DB\Tables());
		} else {
			$this->database = $database;
		}

		$this->database->getAccountsTable();
		$this->database->getListsTable();

	}

}
