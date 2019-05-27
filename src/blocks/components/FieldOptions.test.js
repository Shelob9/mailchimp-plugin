import renderer from 'react-test-renderer';
import {FieldOptions} from "./FieldOptions";


describe('FieldOptions', () => {

    const props = {accountId:1, listId:'fssd', instanceId:'aads', setFieldsToHide: jest.fn(), fieldsToHide:jest.fn()};
    it('Matches snapshot', () => {
        const component = renderer.create(
            <FieldOptions {...props} />
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

});
