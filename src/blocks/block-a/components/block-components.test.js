import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import {DisplayA} from "./DisplayA";
import {EditA} from "./EditA";

describe('Tests working', () => {
	it('should work', () => {
		expect(1).toBe(1);
	});
});

describe('DisplayA component', () => {
	it( 'shows message', () => {
		const component = renderer.create(
			<DisplayA message={'The Words'} />
		);
		expect( component.toJSON()).toMatchSnapshot();
	});

	it( 'shows message in bold', () => {
		const component = renderer.create(
			<DisplayA message={'The Words'} useBold={true} />
		);
		expect( component.toJSON()).toMatchSnapshot();
	})
});


describe('EditA component', () => {
	let onChangeMessage;
	let onChangeBold;
	beforeEach(() => {
		onChangeMessage = jest.fn();
		onChangeBold = jest.fn();
	});
	it( 'Updates message', () => {
		const component = mount(
			<EditA
				onChangeMessage={onChangeMessage}
				onChangeBold={onChangeBold}
				useBold={true}
				message={'Hello'}
			/>
		);
		component.find( '.edit-a-message' ).find( 'input' ).simulate( 'change' );
		expect( onChangeMessage.mock.calls.length ).toBe(1);
		expect( onChangeBold.mock.calls.length ).toBe(0);
	});

	it( 'Updates use bold setting', () => {
		const component = mount(
			<EditA
				onChangeMessage={onChangeMessage}
				onChangeBold={onChangeBold}
				useBold={false}
				message={'Hello'}
			/>
		);
		component.find( '.edit-a-use-bold' ).find( 'input' ).first().simulate('change', { target: { checked: true } });
		expect( onChangeBold.mock.calls.length ).toBe(1);
		expect( onChangeMessage.mock.calls.length ).toBe(0);
	});

});
