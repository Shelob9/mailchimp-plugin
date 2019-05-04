import React from 'react';

import renderer from 'react-test-renderer';
import {MailChimpSurveyForm} from "./index";
import {surveyQuestion1,surveryQuestion2,surveyEmailField,surveyQuestion1Id,surveyQuestionFields,surveyQuestionId2} from "./surveyFields.fixture";

it('Forms', () => {

	expect(renderer.create(
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
	)).toMatchSnapshot();


});


