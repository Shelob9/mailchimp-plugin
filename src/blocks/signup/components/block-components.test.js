import renderer from 'react-test-renderer';
import {Display} from "./Display";
import {Edit} from "./Edit";
import {mailChimpTestForm} from "../../../components/mailChimpTestForm.fixture";

describe('Tests working', () => {
	it('should work', () => {
		expect(1).toBe(1);
	});
});

describe('Display component', () => {
	it( 'Shows mailchimp form', () => {
		const component = renderer.create(
			<Display Fallback={<div>Fallback</div>} form={{mailChimpTestForm} } listId={'listId'}/>
		);
		expect( component.toJSON()).toMatchSnapshot();
	});

	it( 'shows fallback if no list id', () => {
		const Fallback  = () => (<div>Fallback</div>);
		const component = renderer.create(
			<Display Fallback={Fallback} form={{mailChimpTestForm} } />
		);
		expect( component.toJSON()).toMatchSnapshot();
	});

	const listFieldUiConfig= [];
	it( 'shows edit form', () => {
		const onChange = jest.fn();
		const component = renderer.create(
			<Edit
				listId={'listId'}
				onChangeListId={onChange}
				listFields={listFieldUiConfig}
			/>
		);
		expect( component.toJSON()).toMatchSnapshot();
	});
});



