import {createElement} from '@wordpress/element';
import {withSelect} from '@wordpress/data';
import CalderaMailChimpForm from "../../../components/CalderaMailChimpForm";
import {CALDERA_MAILCHIMP_STORE} from "../../../store";



export const Display = ({listId, apiRoot,token,Fallback}) => {
	if( listId ){
		return <CalderaMailChimpForm
			apiRoot={apiRoot}
			token={token}
			listId={listId}
			onSubmit={(values) => alert(JSON.stringify(values))}
		/>

	}
	return <Fallback/>
};

export const DisplayWithState = withSelect( ( select ) => {
	const { getApiRoot,getToken } = select( CALDERA_MAILCHIMP_STORE );
	return {
		apiRoot: getApiRoot(),
		token: getToken()
	};
} )( Display );
