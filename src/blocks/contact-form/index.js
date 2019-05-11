import {Fragment} from "@wordpress/element";
import {withSelect} from '@wordpress/data';
import {Placeholder} from "@wordpress/components";
import {InspectorControls} from "@wordpress/block-editor";
import {CalderaContactForm} from "../../components/CalderaContactForm";
import {CALDERA_MAILCHIMP_STORE} from "../../store";

const attributes = {};

const FormWithState = (select => {
    const {getApiRoot} = select(CALDERA_MAILCHIMP_STORE);
    return {
        apiRootUrl: getApiRoot()
    }
})(CalderaContactForm);
export const name = 'calderamailchimp/contact';
export const options = {
    title: 'Contact Form',
    description: 'Basic Contact Form',
    icon: 'image-filter',
    category: 'widgets',
    attributes,
    edit() {
        return (
            <Fragment>
                <FormWithState/>
            </Fragment>)


    },
    save({className}) {
        return (
            <div className={className}>
                <div className={'calderaMailchimpContactForm'}>
                    <FormWithState/>
                </div>
            </div>
        )
    }
};