<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\caldera\restApi\Authentication\AuthenticationException;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use calderawp\interop\Contracts\Rest\RestRequestContract as Request;
use calderawp\interop\Contracts\Rest\RestResponseContract as Response;

class VerifyToken extends GenerateToken
{


    /**
     * @inheritDoc
     */
    public function getHttpMethod(): string
    {
        return 'GET';
    }

    /**
     * @inheritDoc
     */
    public function getArgs(): array
    {
        return [
            'token' => [
                'type' => 'string',
                'required' => true,
            ]
        ];
    }

    /**
     * @inheritDoc
     */
    public function getToken(Request $request): string
    {
        return $request->getParam('token');
    }

    /**
     * @inheritDoc
     */
    public function handleRequest(Request $request): Response
    {
        $token = $this->getToken($request);
        $secret = $this->getModule()->getJwtSecret();
        try {
            $_token = \Firebase\JWT\JWT::decode($token, $secret, ['HS256']);
            return $this->tokenResponse($token);
        } catch (\Exception $e) {
            return (new \calderawp\caldera\restApi\Response())->setStatus($e->getCode())->setData(['message' => $e->getMessage()]);
        }
    }


}