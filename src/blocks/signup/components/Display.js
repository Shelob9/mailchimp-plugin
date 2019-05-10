import {createElement} from '@wordpress/element';
import CalderaMailChimpForm from "../../../components/CalderaMailChimpForm";
import {createFormPreviewWithState} from "../../createFormPreviewWithState";



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


export const DisplayWithState = createFormPreviewWithState(Display);
