import renderer from 'react-test-renderer';
import {ApiKeySettings} from "./ApiKeySettings";



describe('ApiKeySettings', () => {


    it('Matches snapshot', () => {
        const component = renderer.create(
            <ApiKeySettings instanceId={'ccc'} adminApiClient={jest.fn()}/>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

});




