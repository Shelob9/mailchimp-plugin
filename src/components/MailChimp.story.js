import React from 'react';
import {storiesOf} from '@storybook/react';
import {MailChimpForm, MailChimpSurveyForm} from "./index";
import {mailChimpTestForm} from "./mailChimpTestForm.fixture";
import {
	surveyQuestion1,
	surveryQuestion2,
	surveyEmailField,
	surveyQuestion1Id,
	surveyQuestionFields,
	surveyQuestionId2
} from "./surveyFields.fixture";

storiesOf('MailChimp Form Components', module)

	.add('Mailchimp Signup form', () => (
		<MailChimpForm
			form={mailChimpTestForm}
			onSubmit={(values) => alert(JSON.stringify(values))}
		/>
	))
	.add('Mailchimp Survey Form', () => (
		<MailChimpSurveyForm
			listId={'a111'}
			onChange={() => {
			}}
			onBlur={() => {
			}}
			questions={surveyQuestionFields}
			emailField={surveyEmailField}
			initialQuestionId={surveyQuestion1Id}
		/>
	))
;
