import {CALDERA_MAILCHIMP_STORE} from "../store";
import {withSelect} from '@wordpress/data';
export function createFormPreviewWithState(Component) {
    return withSelect( ( select,ownProps ) => {
        const { getApiRoot,getToken,getListUi } = select( CALDERA_MAILCHIMP_STORE );
        const {listId} = ownProps;
        return {
            listUi: getListUi(listId),
            apiRoot: getApiRoot(),
            token: getToken()
        };
    } )( Component );
}