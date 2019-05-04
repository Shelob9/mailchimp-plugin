import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import MailChimpSurveyForm from './MailChimpSurveyForm';

/**
 * Load remote MailChimp sign up mailChimpTestForm via the WordPress REST API
 *
 * @param listId
 * @param apiRoot
 * @param token
 * @param hideOnSubmit
 * @return {*}
 * @constructor
 */
function CalderaMailChimpSurveyForm({listId, apiRoot, token}) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [form, setForm] = useState({});
	const getFormUrl = `${apiRoot}/${listId}/form?token=${token}`;

	function findProcessor(form) {
		return form.processors.find(processor => 'mc-subscribe' === processor.type);
	}

	function getEmailField(form) {
		const processor = findProcessor(form);
		const emailFieldId = processor.emailField;
		return form.fields.find(field => emailFieldId === field.fieldId);
	}

	function getGroupFields(form) {
		const processor = findProcessor(form);
		const groupFieldIds = processor.groupFields;
		const groupFields = form.fields.filter(field => groupFieldIds.includes(field.fieldId));
		return groupFields;
	}

	const submitUrl = `${apiRoot}/subscribe`;
	useEffect(() => {
		fetch(getFormUrl)
			.then(r => r.json())
			.then(r => {
				console.log(r);
				setForm(r);
				setIsLoaded(true);
			});

	}, [form, isLoaded, setIsLoaded]);
	if (isLoaded) {
		return <MailChimpSurveyForm
			submitUrl={submitUrl}
			listId={listId}
			emailField={getEmailField(form)}
			questions={getGroupFields(form)}
		/>
	}
	return <div>Loading</div>;


}


CalderaMailChimpSurveyForm.propTypes = {
	token: PropTypes.string.isRequired,
	listId: PropTypes.string.isRequired,
	apiRoot: PropTypes.string,
	hideOnSubmit: PropTypes.bool,
};

CalderaMailChimpSurveyForm.defaultProps = {
	hideOnSubmit: true,
	apiRoot: 'https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/v1/lists'
};
export default CalderaMailChimpSurveyForm;
