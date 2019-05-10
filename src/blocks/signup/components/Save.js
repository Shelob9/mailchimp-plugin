import {createElement} from '@wordpress/element';
export const Save = ({attributes, className}) =>  (
    <div className={className}>
        <span className={'calderaMailchimp'} data-list={attributes.listId}></span>
    </div>
);