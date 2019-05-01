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
it('finds  question index when possible', () => {
	const component = renderer.create(<MailChimpSurveyForm
		listId={'a111'}
		onChange={() => {
		}}
		onBlur={() => {
		}}
		questions={questions}
		emailField={emailField}
		initialQuestionId={fakeQuestionFieldId2}
	/>);
	const instance = component.root;
	expect(instance.props.findQuestionIndex(fakeQuestionFieldId2, questions))
		.toEqual(0);
	expect(instance.props.findQuestionIndex(fakeQuestionFieldId3, questions))
		.toEqual(1);
})

it('findCurrentQuestion() finds next question when there is one to find', () => {
	const component = renderer.create(<MailChimpSurveyForm
		listId={'a111'}
		onChange={() => {
		}}
		onBlur={() => {
		}}
		questions={questions}
		emailField={emailField}
		initialQuestionId={fakeQuestionFieldId2}
	/>);
	const instance = component.root;
	const index = instance.props.findQuestionIndex(fakeQuestionFieldId2, questions);
	expect(instance.props.findCurrentQuestion(index, questions, 0)).toEqual(fakeQuestionField2);
	expect(instance.props.findCurrentQuestion(index + 1, questions, 0)).toEqual(fakeQuestionField3);
});

it('findCurrentQuestion() returns false when there is no more questions to find', () => {
	const component = renderer.create(<MailChimpSurveyForm
		listId={'a111'}
		onChange={() => {
		}}
		onBlur={() => {
		}}
		questions={questions}
		emailField={emailField}
		initialQuestionId={fakeQuestionFieldId2}
	/>);
	const instance = component.root;
	const index = instance.props.findQuestionIndex(fakeQuestionFieldId2, questions);
	expect(instance.props.findCurrentQuestion(3, questions, 0)).toEqual(false);
	expect(instance.props.findCurrentQuestion(12, questions, 0)).toEqual(false);
});

it('finds the next question', () => {
	const component = renderer.create(<MailChimpSurveyForm
		listId={'a111'}
		onChange={() => {
		}}
		onBlur={() => {
		}}
		questions={questions}
		emailField={emailField}
		initialQuestionId={fakeQuestionFieldId2}
	/>);
	const instance = component.root;
	expect(instance.props.findNextQuestion(0, questions)).toEqual(fakeQuestionField3);
	expect(instance.props.findNextQuestion(1, questions)).toEqual(false);
	expect(instance.props.findNextQuestion(2, questions)).toEqual(false);
	expect(instance.props.findNextQuestion(-1, questions)).toEqual(false);
});


