import {Fragment} from "@wordpress/element";
import {withSelect} from '@wordpress/data';

import {CalderaContactForm} from "../../components/CalderaContactForm";
import {CALDERA_MAILCHIMP_STORE} from "../../store";

const attributes = {};

const FormWithState = withSelect(select => {
    const {getWpApiRoot} = select(CALDERA_MAILCHIMP_STORE);
    return {
        apiRootUrl: getWpApiRoot()
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