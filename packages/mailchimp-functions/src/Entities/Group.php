<?php


namespace something\Mailchimp\Entities;


use calderawp\interop\SimpleEntity;
use \something\Mailchimp\Interfaces\ConvertsToUiField;

class Group extends MailChimpEntity implements ConvertsToUiField
{

	/**
	 * @var string
	 */
	protected $groupId;

	/**
	 * @var string
	 */
	protected $title;

	/**
	 * @var string
	 */
	protected $type;

	/**
	 * @var bool
	 */
	protected $shouldJoin;


	public static function fromArray(array $items): SimpleEntity
	{
		$obj = parent::fromArray($items);
		if( isset( $items['id']) && ! isset( $items['groupId']) ){
			$obj->setGroupId((string) $items['id']);
		}
		if( isset( $items['groupId'])){
			$obj->setGroupId((string) $items['groupId']);
		}
		return $obj;
	}

	/**
	 * @inheritDoc
	 */
	public function toUiFieldConfig(): array
	{
		return [
			'fieldId' => $this->getGroupId(),
			'label' => $this->getTitle(),
			'fieldType' => $this->getType(),
			'value' => ''
		];
	}


	/**
	 * @return string
	 */
	public function getGroupId(): string
	{
		return $this->groupId;
	}

	/**
	 * @param string $groupId
	 *
	 * @return Group
	 */
	public function setGroupId(string $groupId): Group
	{
		$this->groupId = $groupId;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getTitle(): string
	{
		return $this->title;
	}

	/**
	 * @param string $title
	 *
	 * @return Group
	 */
	public function setTitle(string $title): Group
	{
		$this->title = $title;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getType(): string
	{
		return $this->type;
	}

	/**
	 * @param string $type
	 *
	 * @return Group
	 */
	public function setType(string $type): Group
	{
		$this->type = $type;
		return $this;
	}

	/**
	 * @return bool
	 */
	public function getShouldJoin(): bool
	{
		//if not set, default is false
		return (bool)$this->shouldJoin;
	}

	/**
	 * @param bool $shouldJoin
	 *
	 * @return Group
	 */
	public function setShouldJoin(bool $shouldJoin): Group
	{
		$this->shouldJoin = $shouldJoin;
		return $this;
	}

	public function getId()
	{
		return $this->getGroupId();
	}

	public function setId( string $id ): Group
	{
		return $this->setGroupId($id);
	}



}
