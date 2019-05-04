import renderer from 'react-test-renderer';
import {DisplayA} from "./DisplayA";

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



