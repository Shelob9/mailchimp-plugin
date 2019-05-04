<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use something\Mailchimp\Entities\Groups;
use something\Mailchimp\Entities\MergeVars;
use something\Mailchimp\Entities\SingleList;
use calderawp\caldera\restApi\Exception;
use calderawp\CalderaMailChimp\CalderaMailChimp;
use calderawp\DB\Exceptions\InvalidColumnException;
trait GetsSavedList
{

	/**
	 * @param string $listId
	 *
	 * @return SingleList|null
	 * @throws \calderawp\DB\Exceptions\InvalidColumnException
	 */
	protected function getSavedList(string $listId): ?SingleList
	{
		try {
			$saved = $this->module->getDatabase()->getListsTable()
				->findWhere('list_id', $listId);
		} catch (\Exception $e) {
			$x = 1;
		}
		if (!empty($saved)) {
			$data = unserialize($saved[ 0 ][ 'data' ]);
			$groups = is_array($data[ 'groups' ]) && is_array($data[ 'groups' ][ 'groups' ])
				? Groups::fromArray($data[ 'groups' ][ 'groups' ]) :
				new Groups();
			if (!empty($data[ 'groups' ][ 'categories' ])) {
				foreach ($data[ 'groups' ][ 'categories' ] as $groupId => $category) {
					$groups->addCategoriesForGroup($groupId, $category);
				}
			}
			$groups->setListId($listId);
			$mergeFields = is_array($data[ 'mergeFields' ]) && is_array($data[ 'mergeFields' ][ 'mergeVars' ])
				? MergeVars::fromArray($data[ 'mergeFields' ][ 'mergeVars' ])
				: new MergeVars();
			$mergeFields->setListId($listId);

			$entity = SingleList::fromArray([
				'groups' => $groups,
				'list_id' => $listId,
				'mergeFields' => $mergeFields,
			]);
			$entity->setName( ! empty( $data['name']) ? $data['name'] : '');

			return $entity;
		}
		return null;

	}

	/**
	 * @param string $listId
	 *
	 * @throws Exception
	 * @throws InvalidColumnException|\calderawp\caldera\restApi\Exception
	 */
	protected function setList(string $listId): void
	{
		try {
			$this->list = $this->getSavedList($listId);
			return;
		} catch (InvalidColumnException $e) {
			throw  $e;
		}
		throw new Exception( 404, 'not found');
	}
}
