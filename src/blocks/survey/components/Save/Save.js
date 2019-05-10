import {createElement} from '@wordpress/element';
import {blockClassNameIdentifiers} from "../../../blockClassNameIdentifiers";

export const Save = ({attributes, className}) =>  (
    <div className={className}>
        <span className={blockClassNameIdentifiers.survey} data-list={attributes.listId}></span>
    </div>
);