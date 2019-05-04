import React from 'react';

import renderer from 'react-test-renderer';
import MailChimpSurveyForm from "./MailChimpSurveyForm";

const fakeQuestionFieldId2 = 'fakeGroup2';
const fakeQuestionField2 = {
	"fieldId": fakeQuestionFieldId2,
	"label": "Are you new to JavaScript",
	"fieldType": "checkbox",
	"value": [],
	"options": [
		{"id": "75091baaad", "value": "75091baaad", "label": "Totally"},
		{"id": "75091baaa1", "value": "75091baad1", "label": "Not At All"},
		{"id": "0a4dc88501", "value": "0a4dc88501", "label": "A Bit"}
	]
};

const fakeQuestionFieldId3 = 'fakeGroup3';
const fakeQuestionField3 = {
	"fieldId": fakeQuestionFieldId3,
	"label": "Are you comfortable with any JvaScr",
	"fieldType": "checkbox",
	"value": [],
	"options": [
		{"id": "15091baaad", "value": "15091baaad", "label": "React"},
		{"id": "15091baad1", "value": "15091baad1", "label": "VueJs"},
		{"id": "1a4dc88501", "value": "1a4dc88501", "label": "AngularJS"}
	]
};

const questions = [fakeQuestionField2, fakeQuestionField3];

const emailField = {
	type: 'input',
	html5type: 'email',
	required: true,
	label: 'Email',
}
it('Forms', () => {

	expect(renderer.create(<MailChimpSurveyForm
		listId={'a111'}
		onChange={() => {
		}}
		onBlur={() => {
		}}
		questions={questions}
		emailField={emailField}
		initialQuestionId={fakeQuestionFieldId2}
	/>)).toMatchSnapshot();


});


