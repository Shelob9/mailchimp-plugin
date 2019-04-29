import {CalderaForm} from "@calderajs/forms";
import React, {useState} from "react";
import {PacmanLoader } from 'react-spinners';

/**
 * Component for stand-alone mailchimp forms served via Caldera API
 *
 * @param form
 * @param onChange
 * @param onBlur
 * @return {*}
 * @constructor
 */
function  MailChimpForm({form,onChange,onBlur}) {
	const [isSubmitting,setIsSubmitting] = useState(false);
	const [completed,setIsCompleted] = useState(false);
	const [message,setMessage] = useState('');

	const Spinner = () => (
		<div><PacmanLoader/></div>
	);

	if( ! form.hasOwnProperty('fields')){
		return <Spinner/>
	}

	const {processors} = form;
	const processor = processors.find( p => 'mc-subscribe' === p.type );

	/**
	 * Submit handler
	 *
	 * @param values
	 * @return {*}
	 */
	const onSubmit = (values) => {
		const getValue = (key ) => {
			if( values.hasOwnProperty(key)){
				return values[key];
			}
			return null;
		};
		const {listId,submitUrl} = processor;
		const mergeFields = {};
		const groupFields = {};
		processor.mergeFields.forEach(field => {
			mergeFields[field] = getValue(field);
		});
		processor.groupFields.forEach(field => {
			groupFields[field] = getValue(field);
		});

		const data = {
			email: getValue(processor.emailField),
			mergeFields,
			groupFields,
			listId
		};
		return fetch(submitUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		});
	};


	if( completed ){
		return <div className={'success'}>{message}</div>
	}
	if( message ){
		return <div className={'error'}>{message}</div>
	}
	if(  isSubmitting ) {
		return <Spinner/>;
	}

	return (
		<div>
			<CalderaForm
				form={form}
				onSubmit={(
					//current values of all fields
					values,
					actions
				) => {
					setIsSubmitting(true);
					onSubmit(values).then(r => r.json() ).then(r => {
							setMessage(r.message);
							setIsCompleted(r)
						})
						.catch( e => {
							setIsSubmitting(false);
							if (e.hasOwnProperty('message')) {
								setMessage(e.message);
							} else {
								setMessage('An Error happened.');

							}
						});
				}}
				onChange={(values) => {
					console.log(values) //all field values
				}}
			/>
		</div>

	)
}

export default MailChimpForm;
