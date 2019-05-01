import React, {useState} from 'react';
import MailChimpForm from './MailChimpForm'
import PropTypes from 'prop-types';

function MailChimpSurveyForm(
	{
		emailField,
		initialQuestionId,
		questions,
		onChange,
		onBlur,
		findNextQuestion,
		findCurrentQuestion,
		listId,
	}
) {


	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
		questions.findIndex(question => initialQuestionId === question.fieldId)
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


	const updateForm = () => {
		const nextQuestion = (currentQuestionId, questions);
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
	const onSubmit = (values) => {
		return new Promise((resolve, reject) => {
			onSubmit(values, processor).then(r => r.json()).then(r => {
					updateForm();
					resolve(new Response(JSON.stringify({message: 'next step!'})));

				})
				.catch(e => {
					reject(e);
				});


		});
	}


	return (
		<MailChimpForm
			form={form}
			onBlur={onBlur}
			onChange={onChange}
			onSubmit={onSubmit}
			hideOnSubmit={false}
		/>
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
	findNextFunction(currentQuestionIndex, questions) {
		if (-1 !== currentQuestionIndex && currentQuestionIndex + 1 <= questions.length) {
			return questions[currentQuestionIndex];
		}
		return false;
	},
	findCurrentQuestion(findIndex, questions, currentQuestionIndex) {
		if (-1 !== currentQuestionIndex) {
			return questions[findIndex];
		}
		return false;
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
