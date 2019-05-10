import {createElement} from '@wordpress/element';
import {withSelect} from '@wordpress/data';
import CalderaMailChimpForm from "../../../components/CalderaMailChimpForm";
import {CALDERA_MAILCHIMP_STORE} from "../../../store";



export const Display = ({listId, apiRoot,token,listUi,Fallback}) => {
	if( listId && '---' !== listId ){
		return <CalderaMailChimpForm
			apiRoot={apiRoot}
			token={token}
			listId={listId}
			onSubmit={(values) => alert(JSON.stringify(values))}
		/>

	}
	return <Fallback/>
};

export const DisplayWithState = withSelect( ( select,ownProps ) => {
	const { getApiRoot,getToken,getListUi } = select( CALDERA_MAILCHIMP_STORE );
	const {listId} = ownProps;
	return {
		listUi: getListUi(listId),
		apiRoot: getApiRoot(),
		token: getToken()
	};
} )( Display );
