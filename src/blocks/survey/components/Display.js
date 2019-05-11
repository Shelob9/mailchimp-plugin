import {createElement} from '@wordpress/element';
import CalderaMailChimpSurveyForm from "../../../components/CalderaMailChimpSurveyForm";

/**
 * Display survey form preview in block
 * @param listId
 * @param apiRoot
 * @param token
 * @param Fallback
 * @param form
 * @param fieldsToHide
 * @returns {*}
 * @constructor
 */
export const Display = ({listId, apiRoot,token,Fallback,form,fieldsToHide}) => {
	if( listId && '---' !== listId ){
		const processor  = form && form.hasOwnProperty('processors')  ? form.processors.find(processor => 'mc-subscribe' === processor.type) : null;
		if( processor && fieldsToHide && Object.keys(fieldsToHide).length ){
			Object.keys(fieldsToHide).forEach( fieldId => {
				const hide = fieldsToHide[fieldId];
				if( hide ){
					const index = form.fields.findIndex( field => fieldId === field.fieldId );
					if (index > -1) {
						form.fields.splice(index, 1);
						if (processor.mergeFields.length) {
							const mergeFieldsIndex = processor.mergeFields.findIndex(mergeFieldId => fieldId === mergeFieldId);
							if (mergeFieldsIndex) {
								processor.mergeFields.splice(mergeFieldsIndex, 1);
							}
						}
						if (processor.groupFields) {
							const groupFieldIndex = processor.groupFields.findIndex(groupFieldId => fieldId === groupFieldId);
							if (groupFieldIndex) {
								processor.groupFields.splice(groupFieldIndex, 1);
							}
						}
					}
				}

			})
		}

		if (processor && processor.groupFields.length) {
			return <CalderaMailChimpSurveyForm
				initialForm={form}
				apiRoot={apiRoot}
				token={token}
				listId={listId}
				onSubmit={(values,actions) => alert(JSON.stringify(values))}//@TODO reset form after last step actions.reset()?
			/>
		}

	}
	return <Fallback/>
};


