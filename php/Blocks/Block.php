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
    abstract public function render(array $atts, string $content = null): string;

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