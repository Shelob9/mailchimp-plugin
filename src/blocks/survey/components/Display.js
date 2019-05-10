import {createElement} from '@wordpress/element';
import CalderaMailChimpSurveyForm from "../../../components/CalderaMailChimpSurveyForm";



export const Display = ({listId, apiRoot,token,Fallback}) => {
	if( listId && '---' !== listId ){
		return <CalderaMailChimpSurveyForm
			apiRoot={apiRoot}
			token={token}
			listId={listId}
			onSubmit={(values) => alert(JSON.stringify(values))}
		/>

	}
	return <Fallback/>
};


