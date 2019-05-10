import {DisplayWithState} from "./components/Display";
import {Edit} from "./components/Edit";
import {InspectorControls} from '@wordpress/editor';
import {Fragment} from "react";
import {select, dispatch, withDispatch, withSelect} from '@wordpress/data';
import {CALDERA_MAILCHIMP_STORE} from "../../store";
import {Placeholder} from '@wordpress/components';
import {Save} from "./components/Save";
import {attributes} from "../attributes";

export const name = 'caldera-mailchimp/signup';



/**
 *
 * @param attributes
 * @param setAttributes
 * @param instanceId
 * @return {*}
 * @constructor
 */
export function SignupBlockAdminUi(
    {
        listId,
        setListId,
        accountId,
        setAccountId,
        instanceId,
        listFields,
        chooseAccountField,
        adminApiClient
    }
) {


    return (
        <Fragment>
            <DisplayWithState
                listId={listId}
                Fallback={() => (
                    <Placeholder>
                        Use Block Settings For Form
                    </Placeholder>

                )}
            />
            <InspectorControls>
                <Edit
                    accountId={accountId}
                    listFieldConfig={listFields}
                    listId={listId}
                    setListId={setListId}
                    chooseAccountField={chooseAccountField}
                    onChangeAccountId={setAccountId}
                    adminApiClient={adminApiClient}
                    instanceId={instanceId}
                />
            </InspectorControls>
        </Fragment>)
}





const SignupBlockAdminUiWithState = withSelect((select, ownProps) => {
    const {
        accountId,
    } = ownProps;
    const {
        getListsUi,
        getAccountsUi,
        getClient
    } = select(CALDERA_MAILCHIMP_STORE);


    return {
        listFields: getListsUi(accountId),
        chooseAccountField: getAccountsUi(),
        adminApiClient: getClient(),
    };
})(withDispatch((dispatch) => {
    const {
        setListsUi
    } = dispatch(CALDERA_MAILCHIMP_STORE);
    return {
        setListsUi
    };
})(SignupBlockAdminUi));

export const options = {
    title: 'Mailchimp Signup Form',
    description: 'Render another sample block.',
    icon: 'images-alt',
    category: 'widgets',
    attributes,
    edit({attributes, setAttributes, instanceId}) {
        const {
            listId,
            accountId
        } = attributes;
        const setAccountId = (accountId) => {
            setAttributes({accountId,listId:null});
        };
        const setListId = (listId) => {
            setAttributes({listId});
        };


        return SignupBlockAdminUiWithState({
            listId,
            setListId,
            accountId,
            setAccountId,
            instanceId,

        });
    },
    save: Save
};


