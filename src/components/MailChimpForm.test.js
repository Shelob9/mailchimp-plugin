import React from 'react';

import renderer from 'react-test-renderer';
import MailChimpForm from "./MailChimpForm";

import {mailChimpTestForm} from "./mailChimpTestForm.fixture";


describe( 'MailChimp mailChimpTestForm', () => {
	let onSubmit, onBlur,onChange;
	beforeEach( () => {
		onSubmit = jest.fn();
		onBlur = jest.fn();
		onChange = jest.fn();
	});

	it('Shows spinner if mailChimpTestForm does not have fields', () => {

		expect(renderer.create(
			<MailChimpForm
				form={{
					ID: 'mc-test-1'
				}}
				onBlur={onBlur}
				onChange={onChange}
				onSubmit={onSubmit}
			/>
		)).toMatchSnapshot();


	});

	it('Loads if it has proper mailChimpTestForm', () => {

		expect(renderer.create(
			<MailChimpForm
				form={mailChimpTestForm}
				onBlur={onBlur}
				onChange={onChange}
				onSubmit={onSubmit}
			/>
		)).toMatchSnapshot();


	});
});



