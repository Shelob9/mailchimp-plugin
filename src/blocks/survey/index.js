import {Edit} from "../signup/components/Edit";
import {Save} from "../survey/components/Save/Save";

export const name = 'caldera-mailchimp/survey';
import {attributes} from "../attributes";
import {Fragment, createElement} from "@wordpress/element";
import {Placeholder} from "@wordpress/components";
import {InspectorControls} from "@wordpress/block-editor";
import {Display} from "./components/Display";
import {createFormPreviewWithState} from "../createFormPreviewWithState";
import {CALDERA_MAILCHIMP_STORE} from "../../store";
import {withSelect, withDispatch} from "@wordpress/data";

const DisplayWithState = createFormPreviewWithState(Display);

const EditWithState = withSelect((select, ownProps) => {
    const {
        accountId,
    } = ownProps;
    const {
        getListsUi,
        getAccountsUi,
        getClient
    } = select(CALDERA_MAILCHIMP_STORE);


    return {
        listFieldConfig: getListsUi(accountId),
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
})(Edit));

export const options = {
    title: 'MailChimp Survey Form',

    description: 'Render a sample block.',

    icon: 'image-filter',
    category: 'widgets',
    attributes,
    edit({attributes, setAttributes}) {
        const {accountId, listId} = attributes;
        const setListId = (listId) => setAttributes({listId});
        const setAccountId = (accountId) => setAttributes({accountId,listId:null});
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
                    <EditWithState
                        listId={listId}
                        accountId={accountId}
                        onChangeAccountId={setAccountId}
                        setListId={setListId}
                    />
                </InspectorControls>
            </Fragment>)


    },

    save: Save,
};
