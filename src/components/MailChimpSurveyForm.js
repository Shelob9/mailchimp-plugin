import React, {Fragment, useState, useMemo} from 'react';
import MailChimpForm from './MailChimpForm'
import PropTypes from 'prop-types';
import {CalderaNotice} from '@calderajs/components';
import {updateSubscriber, createSubscriber} from "../http/publicClient";
import { isEmailValid } from 'is-email-valid'; // Please be aware of the alias `isEmail`



function MailChimpSurveyForm(
    {
        submitUrl,
        emailField,
        questions,
        onChange,
        onBlur,
        onSubmit,
        listId,
        defaultEmailAddress
    }
) {

    const formId = `mc-subscribe-${listId}`;
    /**
     * Track if survey is completed
     */
    const [completed, setCompleted] = useState(false);

    /**
     * Store the error/success message from server
     */
    const [message, setMessage] = useState('');

    /**
     * Store the email address
     */
    const [emailAddress, setEmailAddress] = useState(defaultEmailAddress);


    /**
     * Track current question
     */
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


    const submitButtonId = 'submitQuestion';
    const submitButton = {"fieldId": submitButtonId, "fieldType": "submit", "value": "Subscribe"};
    const initialQuestion = questions[currentQuestionIndex];

    const questionRowId = 'r1';

    function createQuestionFieldRow(questionFieldId, questionRowId) {
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


    function createOtherRow(emailFieldId, submitButtonId) {
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

    function createForm({formId, currentQuestion, emailField, submitButton, questionRowId, submitUrl}) {
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
                createQuestionFieldRow(currentQuestion.fieldId, questionRowId),
                createOtherRow(emailField.fieldId, submitButton.fieldId)
            ],
            processors: [processor]
        };
    }

    let initialEmailField = emailField;
    if (isEmailValid(emailAddress)) {
        initialEmailField.fieldType = 'hidden';
        initialEmailField.value = emailAddress;
    }

    const initialForm = {
        formId,
        currentQuestion: initialQuestion,
        emailField: initialEmailField,
        submitButton,
        questionRowId,
        submitUrl
    };

    /**
     * Create initial mailChimpTestForm and track its state
     */
    const [form, setForm] = useState(initialForm);

    /**
     * On submission, advance to next question or set as completed.
     */
    const updateForm = () => {
        if (currentQuestionIndex === questions.length - 1) {
            setCompleted(true);
        } else {
            const nextQuestion = questions[currentQuestionIndex + 1];
            setForm(createForm(
                {
                    formId,
                    currentQuestion: nextQuestion,
                    emailField: {
                        fieldId: emailField.fieldId,
                        fieldType: 'hidden',
                        value: emailAddress,
                    },
                    submitButton,
                    questionRowId,
                    submitUrl,
                }
            ));


            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }

    };

    /**
     * Handle submit
     *
     * @param values
     * @return {Promise<any>}
     */
    const submitHandler = (values) => {
        function afterSubmit(r, reject, resolve) {
            if (400 === r.data.status) {
                setMessage(r.message);
                reject(new Error(r.hasOwnProperty('message') ? r.message : 'Invalid'));
            } else {
                updateForm();
                resolve(new Response(JSON.stringify({message: r.hasOwnProperty('message') ? r.message : 'Continue'})));
            }
        }

        return new Promise((resolve, reject) => {
            const processor = form.processors[0];
            if (0 === currentQuestionIndex) {
                createSubscriber(values, processor).then(r => r.json()).then(r => {
                    afterSubmit(r, reject, resolve);
                })
                    .catch(e => {
                        reject(e);
                    });
            } else {
                updateSubscriber(values, processor).then(r => r.json()).then(r => {
                    afterSubmit(r, reject, resolve);
                })
                    .catch(e => {
                        reject(e);
                    });
            }


        });
    };

    if (completed) {
        return <div>Completed</div>
    }


    const handleChanges = (values) => {
        console.log(values);
        const emailFieldId = emailField.fieldId;
        if (values.hasOwnProperty(emailFieldId)) {
            setEmailAddress(values[emailFieldId]);
        }

        onChange(values);
    };

    return (
        <Fragment>
            {message &&
            <CalderaNotice
                message={
                    {
                        message: message,
                        error: true,
                    }
                }
            />
            }
            <MailChimpForm
                form={form}
                onBlur={onBlur}
                onChange={handleChanges}
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

    submitUrl: 'https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/v1/lists/subscribe',
    defaultEmailAddress: '',
};

MailChimpSurveyForm.propTypes = {
    emailField: PropTypes.object.isRequired,
    listId: PropTypes.string.isRequired,
    submitUrl: PropTypes.string,
    questions: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onSubmit: PropTypes.func,
    defaultEmailAddress: PropTypes.string,
};

export default MailChimpSurveyForm;
