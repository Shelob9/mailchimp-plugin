import React, {Fragment, useState} from 'react';
import MailChimpForm from './MailChimpForm'
import PropTypes from 'prop-types';
import {CalderaNotice} from '@calderajs/components';
import {updateSubscriber,createSubscriber} from "../http/publicClient";

function MailChimpSurveyForm(
	{
		submitUrl,
		emailField,
		questions,
		onChange,
		onBlur,
		onSubmit,
		listId,
	}
) {

	const formId = `mc-subscribe-${listId}`;
	/**
	 * Track if survey is completed
	 */
	const [completed,setCompleted] = useState(false);

	const [message,setMessage] = useState('');


	/**
	 * Track current question
	 */
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


	const submitButtonId = 'submitQuestion';
	const submitButton = {"fieldId": submitButtonId, "fieldType": "submit", "value": "Subscribe"};
	const initialQuestion = questions[currentQuestionIndex];

	const questionRowId = 'r1';
	function createQuestionFieldRow(questionFieldId,questionRowId){
		return {
			rowId: questionRowId,
			columns: [
				{
					columnId: `${questionRowId}-c1`,
					fields: [questionFieldId],
					width: 1,
				}
			]
		}
	}


	function createOtherRow(emailFieldId,submitButtonId){
		return {
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
	}

	function createForm({formId,currentQuestion,emailField,submitButton,questionRowId,submitUrl}){
		const processor = {
			type: "mc-subscribe",
			listId: listId,
			emailField: emailField.fieldId,
			mergeFields: [],
			groupFields: [currentQuestion.fieldId],
			submitUrl
		};

		return {
			ID: formId,
			fields: [
				currentQuestion,
				emailField,
				submitButton
			],
			rows: [
				createQuestionFieldRow(currentQuestion.fieldId,questionRowId),
				createOtherRow(emailField.fieldId,submitButton.fieldId)
			],
			processors: [processor]
		};
	}

	/**
	 * Create initial form and track its state
	 */
	const [form, setForm] = useState(
		createForm(
			{
				formId,
				currentQuestion: initialQuestion,
				emailField,
				submitButton,
				questionRowId,
				submitUrl
			}
		)
	);

	/**
	 * On submission, advance to next question or set as completed.
	 */
	const updateForm = () => {
		if( currentQuestionIndex === questions.length -1 ){
			setCompleted(true);
		}else{
			const nextQuestion = questions[currentQuestionIndex + 1];

			setForm(createForm(

				{
					formId,
					currentQuestion: nextQuestion,
					emailField:{
						...emailField,
						type: 'input',
						html5type:'hidden',
					},
					submitButton,
					questionRowId,
					submitUrl,
				}
			));
			setCurrentQuestionIndex( currentQuestionIndex + 1 );
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
			const processor = form.processors[0];
			if( 0 === currentQuestionIndex){
				createSubscriber(values,processor).then(r => r.json()).then(r => {
						if( 400 === r.data.status ){
							setMessage(r.message);
							reject(new Error(r.hasOwnProperty('message') ? r.message : 'Invalid'));
						}else{
							updateForm();
							resolve(new Response(JSON.stringify({message: r.hasOwnProperty('message') ? r.message : 'Continue'})));
						}
				})
					.catch(e => {
						reject(e);
					});
			}else{
				updateSubscriber(values,processor).then(r => r.json()).then(r => {
					updateForm();
					resolve(new Response(JSON.stringify({message: r.hasOwnProperty('message') ? r.message : 'Continue'})));
				})
				.catch(e => {
					reject(e);
				});
			}


		});
	};

	if( completed ){
		return <div>Completed</div>
	}


	return (
		<Fragment>
			{message &&
				<CalderaNotice
					message={
						{
							message:message,
							error: true,
						}
					}
				/>
			}
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
		return new Promise((resolve, reject) => {
			resolve(new Response(JSON.stringify({})));
		});
	},
	emailField: {
		"fieldId": "mc-email",
		"fieldType": "input",
		"html5Type": "email",
		"isRequired": true,
		"label": "Email",
		"default": ""
	},

	submitUrl: 'https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/v1/lists/subscribe'

};

MailChimpSurveyForm.propTypes = {
	emailField: PropTypes.object.isRequired,
	listId: PropTypes.string.isRequired,
	submitUrl: PropTypes.string,
	questions: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onSubmit: PropTypes.func,
};

export default MailChimpSurveyForm;
