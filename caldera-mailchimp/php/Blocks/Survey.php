<?php


namespace calderawp\CalderaMailChimp\Blocks;



class Survey extends Block
{
    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return 'caldera-mailchimp/survey';

    }

    /**
     * @inheritDoc
     */
    public function render(array $atts, string $content = null): string
    {

        if( ! empty($atts['fieldsToAdd'])){

        }
        return $content;
    }




}