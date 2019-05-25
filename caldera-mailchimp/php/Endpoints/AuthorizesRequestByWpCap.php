<?php


namespace calderawp\CalderaMailChimp\Endpoints;
use calderawp\caldera\restApi\Authentication\AuthenticationException;
use calderawp\caldera\restApi\Authentication\UserNotFoundException;
use calderawp\caldera\restApi\Authentication\WordPressUserJwt;
use calderawp\interop\Contracts\Rest\RestRequestContract as Request;


trait AuthorizesRequestByWpCap
{

	/**
	 * @param Request $request
	 *
	 * @return bool
	 */
	public function authorizeRequest(Request $request): bool
	{
		if(empty($this->getToken($request))){
			return false;
		}
		try {
			/** @var \WP_User $user */
			$this->user = $this->getJwt()->userFromToken($this->getToken($request));
		} catch (AuthenticationException $e) {
			return false;
		} catch (UserNotFoundException $e) {
			return false;
		}
		return $this->user->has_cap( 'manage_options' );
	}

	abstract public function getToken(Request $request ): string ;
	abstract public function getJwt( ): WordPressUserJwt ;
}
