import React, {Fragment} from 'react';
import renderer from 'react-test-renderer';
import {Header} from "./Header";

describe( 'Header component', () => {
	it( 'Matches snapshot with title prop', () => {
		const component = renderer.create(
			<Header title={'Welcome To An Exciting Web Application'} />
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	it( 'Uses default title', () => {
		const component = renderer.create(
			<Header />
		);
		expect(component.toJSON()).toMatchSnapshot();
	});
});
