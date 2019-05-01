import React, {Fragment, useState} from 'react';
import MailChimpForm from './MailChimpForm'
import PropTypes from 'prop-types';
import {CalderaNotice} from '@calderajs/components';

function MailChimpSurveyForm(
	{
		emailField,
		initialQuestionId,
		questions,
		onChange,
		onBlur,
		onSubmit,
		findNextQuestion,
		findCurrentQuestion,
		findQuestionIndex,
		listId,
	}
) {

	/**
	 * Track if survey is completed
	 */
	const [completed,setCompleted] = useState(false);

	/**
	 * Track current question
	 */
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
		findQuestionIndex(initialQuestionId,questions)
	);


	const emailFieldId = emailField.fieldId;
	const submitButtonId = 'submitQuestion';
	const submitButton = {"fieldId": submitButtonId, "fieldType": "submit", "value": "Subscribe"};
	const initialQuestion = findCurrentQuestion(currentQuestionIndex, questions, currentQuestionIndex);

	const initialProcessor = {
		"type": "mc-subscribe",
		"listId": listId,
		"emailField": emailFieldId,
		"mergeFields": [],
		"groupFields": [initialQuestion.fieldId],
		"submitUrl": "https:\/\/formcalderas.lndo.site\/wp-json\/caldera-api\/v1\/messages\/mailchimp\/v1\/lists\/subscribe"
	};

	/**
	 * Track processor changes
	 */
	const [processor, setProcessor] = useState(initialProcessor);

	const initialForm = {
		fields: [
			initialQuestion,
			emailField,
			submitButton
		],
		rows: [
			{
				rowId: 'r1',
				columns: [
					{
						columnId: 'r1-c1',
						fields: [initialQuestion.fieldId],
						width: 1,
					}
				]
			},
			{
				rowId: 'r2',
				columns: [
					{
						columnId: 'r2-c1',
						fields: [emailFieldId],
						width: '1/2',
					},
					{
						columnId: 'r2-c2',
						fields: [submitButtonId],
						width: '1/2',
					}
				]
			}
		],
		processors: [processor]
	};

	const [form, setForm] = useState(initialForm);


	/**
	 * Update form and form processor
	 */
	const updateForm = () => {
		const nextQuestion = findNextQuestion(currentQuestionIndex, questions);
		if (nextQuestion) {
			setProcessor({
				...processor,
				groupFields: [initialQuestion.fieldId]
			});
			setForm({
				...form,
				processors: [
					...form.processors,
					processor
				]
			});
		} else {
			setCompleted(true);
			setProcessor({
				...processor,
				groupFields: []
			});
			setForm({
				...form,
				processors: [
					...form.processors,
					processor
				]
			});
		}


	};

	/**
	 * Handle submit
	 *
	 * @param values
	 * @return {Promise<any>}
	 */
	const submitHandler = (values) => {
		return new Promise((resolve, reject) => {
			onSubmit(values, processor).then(r => r.json()).then(r => {
					updateForm();
					resolve(new Response(JSON.stringify({message: r.hasOwnProperty('message') ? r.message : 'Continue'})));

				})
				.catch(e => {
					reject(e);
				});


		});
	}

	if( completed ){
		return <div>Completed</div>
	}

	return (
		<Fragment>
			<MailChimpForm
				form={form}
				onBlur={onBlur}
				onChange={onChange}
				onSubmit={submitHandler}
				hideOnSubmit={false}
			/>
		</Fragment>

	)
}


MailChimpSurveyForm.defaultProps = {

	onChange: () => {
	},
	onBlur: () => {
	},
	onSubmit: () => {
	},
	emailField: {
		"fieldId": "mc-email",
		"fieldType": "input",
		"html5Type": "email",
		"isRequired": true,
		"label": "Email",
		"default": ""
	},
	findNextQuestion(currentQuestionIndex, questions) {
		if (-1 !== currentQuestionIndex && currentQuestionIndex + 2 <= questions.length ) {
			return questions[currentQuestionIndex + 1 ];
		}
		return false;
	},
	findCurrentQuestion(findIndex, questions, currentQuestionIndex) {
		if (-1 !== currentQuestionIndex && findIndex <= questions.length) {
			return questions[findIndex];
		}
		return false;
	},
	findQuestionIndex(questionId,questions){
		return questions.findIndex(question => questionId === question.fieldId)
	}
};

MailChimpSurveyForm.propTypes = {
	emailField: PropTypes.object.isRequired,
	listId: PropTypes.string.isRequired,
	initialQuestionId: PropTypes.string.isRequired,
	questions: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onSubmit: PropTypes.func,
};

export default MailChimpSurveyForm;
