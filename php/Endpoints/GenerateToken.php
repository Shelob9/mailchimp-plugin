<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\caldera\restApi\Authentication\Endpoints\Endpoint;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use calderawp\CalderaMailChimp\Controllers\HasModule;
use calderawp\interop\Contracts\Rest\RestRequestContract as Request;
use calderawp\interop\Contracts\Rest\RestResponseContract as Response;
use something\Mailchimp\Endpoints\MailchimpProxyEndpoint;

class GenerateToken extends Endpoint
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
     * @return GenerateToken
     */
    public function setModule(CalderaMailChimp $module): GenerateToken
    {
        $this->module = $module;
        return $this;
    }


    /** @inheritdoc */
    public function getArgs(): array
    {
        return [

        ];
    }

    /** @inheritdoc */
    public function getHttpMethod(): string
    {
        return 'POST';
    }

    /** @inheritdoc */
    public function getUri(): string
    {
        return MailchimpProxyEndpoint::BASE_URI . '/token';
    }

    /**
     * @inheritDoc
     */
    public function handleRequest(Request $request): Response
    {
        return $this->tokenResponse($this->getModule()->getCurrentUserToken());
    }


    /**
     * Create response object with token in it
     * @param string $token
     * @return Response
     */
    protected function tokenResponse(string $token): Response
    {
        return (new \calderawp\caldera\Http\Response())
            ->setData(['token' => $token])
            ->setStatus(201);
    }


}