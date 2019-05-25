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
        if (!empty($results)) {
            return $this->filterForm($results[0]);
        }
        throw new Exception('List not found', 404);
    }

    protected function filterForm(SingleList $form)
    {
        $fieldsToHide = apply_filters('calderawp/Mailchimp/fieldsToHide', [], $form);
        if (!empty($fieldsToHide) && is_array($fieldsToHide)) {
            foreach (array_keys($fieldsToHide) as $fieldToHide) {
                if ($form->getGroupFields()->hasGroup($fieldToHide)) {
                    $form
                        ->getGroupFields()
                        ->removeGroup($fieldToHide);
                }
                if ($form->getMergeFields()->hasMergeVar($fieldToHide)) {
                    $form
                        ->getMergeFields()
                        ->removeMergeVar($fieldToHide);
                }

            }
        }

        return $form;
    }

}