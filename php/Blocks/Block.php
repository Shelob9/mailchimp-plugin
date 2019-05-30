<?php


namespace calderawp\CalderaMailChimp\Blocks;


abstract class Block
{
    /**
     * @var array
     */
    protected $blockAttributes;

    public function __construct(array $blockAttributes)
    {
        $this->blockAttributes = $blockAttributes;
    }

    /**
     * Register block with WordPress
     */
    public function register()
    {
        register_block_type($this->getName(), [
            'attributes' => $this->getBlockAttributes(),
            'render_callback' => [$this, 'render']
        ]);
    }

    /**
     * Get the name of the block
     *
     * @return string
     */
    abstract public function getName(): string;

    /**
     * Server-side render function for blocks
     *
     * @param array $atts
     * @param string|null $content
     * @return string
     */
    /**
     * @inheritDoc
     */
    public function render(array $blockAttributes, string $content = null): string
    {

        if( ! empty($blockAttributes['fieldsToAdd'])&& is_array($blockAttributes['fieldsToAdd'])){
            $fieldsToHide = $blockAttributes['fieldsToAdd'];
            $listId = $blockAttributes['listId'];
            add_filter( 'CalderaMailChimp/fieldsToHide', function($hides,$form)use($fieldsToHide,$listId){
                if ($listId === $form->getListId()) {
                    return $fieldsToHide;
                }
                return $hides;
            },10,2);
        }
        return $content;
    }

    /**
     * @return array
     */
    public function getBlockAttributes(): array
    {
        return $this->blockAttributes;
    }

    /**
     * @param array $blockAttributes
     */
    public function setBlockAttributes(array $blockAttributes): void
    {
        $this->blockAttributes = $blockAttributes;
    }



}
