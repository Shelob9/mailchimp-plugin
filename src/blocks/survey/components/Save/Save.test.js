import {Save} from "./Save";
import renderer from 'react-test-renderer'
import {Display} from "../../../signup/components/Display";
import {mailChimpTestForm} from "../../../../components/mailChimpTestForm.fixture";
test( 'Save matches snapshot', ()=> {
    const attributes= {
        listId:'f411',
        accountId: 3
    };
    const component = renderer.create(
        Save({className:'the-classname',attributes})
    );
    expect(component.toJSON()).toMatchSnapshot();

});