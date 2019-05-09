<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\caldera\restApi\Exception;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use something\Mailchimp\Entities\SingleList;

class GetForm extends \something\Mailchimp\Endpoints\GetForm
{

    /**
     * @var CalderaMailChimp
     */
    protected $module;

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
     * @return GetForm
     */
    public function setModule(CalderaMailChimp $module): GetForm
    {
        $this->module = $module;
        return $this;
    }
    protected function getListByListId(string $listId): SingleList
    {
        $results = $this->getModule()->getDatabase()->getListsDbApi()->findByListId($listId);
       if( ! empty( $results ) ){
           return $results[0];
       }
       throw new Exception('List not found', 404 );
    }

}