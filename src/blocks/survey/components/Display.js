import {createElement} from '@wordpress/element';
import CalderaMailChimpSurveyForm from "../../../components/CalderaMailChimpSurveyForm";



export const Display = ({listId, apiRoot,token,Fallback,form}) => {
	if( listId && '---' !== listId ){
		return <CalderaMailChimpSurveyForm
			initialForm={form}
			apiRoot={apiRoot}
			token={token}
			listId={listId}
			onSubmit={(values) => alert(JSON.stringify(values))}
		/>

	}
	return <Fallback/>
};


