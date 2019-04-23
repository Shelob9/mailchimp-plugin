<?php


namespace calderawp\CalderaMailChimp\Endpoints;


use calderawp\interop\Contracts\Rest\RestRequestContract as Request;
use calderawp\interop\Contracts\Rest\RestResponseContract as Response;

class GetForm extends GetList
{
	/**
	 * @return array
	 */
	public function getArgs(): array
	{
		return [
			'listId' => [
				'type' => 'string',
				'required' => true
			],
			'fields' => [
				'type' => 'array',
				'required' => false,
				'default' => []
			],
			'token' => [
				'type' => 'string',
				'required' => true
			]];

	}


	/**
	 * @param Request $request
	 *
	 * @return bool
	 * @throws \calderawp\DB\Exceptions\InvalidColumnException
	 */
	public function authorizeRequest(Request $request): bool
	{
		return true;
	}

	/**
	 * @param Request $request
	 *
	 * @return Response
	 * @throws \calderawp\DB\Exceptions\InvalidColumnException
	 */
	public function handleRequest(Request $request): Response
	{
		$apiKey = $request->getParam('apiKey');
		$listId = $request->getParam('listId');
		$entity = $this->getSavedList($listId);
		if( ! $entity ){
			return (new \calderawp\caldera\restApi\Response() )->setStatus(404);
		}
		$fields = $entity->toUiFieldConfig();
		$formId = 'mc-' . $listId;
		$form = [
			'ID' => 'mc-' . $listId,
			'fields' => $fields,
			'rows' => [],
			'conditionals' => []
		];
		$rowIndex = 1;
		$columnIndex = 1;
		foreach ($fields as $field ){
			$form[ 'rows'][$rowIndex]['rowId' ] = "${formId}-${rowIndex}";
			$form[ 'rows'][$rowIndex]['columns' ][$columnIndex] = [
				'fields' => [$field['fieldId']],
				'width' => '1/2',
				'columnId' => "${formId}-${rowIndex}-${columnIndex}"
			];
			if( 1 === $columnIndex ){
				$columnIndex = 2;
			}else{
				$columnIndex = 1;
				$rowIndex++;
			}
		}

		return 	 (new \calderawp\caldera\restApi\Response() )->setData($form );

	}

	/**
	 * @return string
	 */
	public function getUri(): string
	{
		return parent::getUri() .'/form';
	}


}
