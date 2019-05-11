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
        listId,
    } = ownProps;
    const {
        getListUi,
        getListsUi,
        getLists,
        getAccountsUi,
        getClient
    } = select(CALDERA_MAILCHIMP_STORE);

    const noop = () => {};
    return {
        lists: accountId ? getLists(accountId) : noop(),
        getListUi: listId ? getListUi(listId): noop(),
        listFieldConfig: accountId ? getListsUi(accountId) : noop(),
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
    description: 'Segment your list with a 1 question at a time survey',
    icon: 'image-filter',
    category: 'widgets',
    attributes,
    edit({attributes, setAttributes}) {
        const {accountId, listId,fieldsToHide} = attributes;
        const setListId = (listId) => setAttributes({listId});
        const setAccountId = (accountId) => {
            setAttributes({accountId,listId:null});
        };
        const setFieldsToHide = (fieldsToHide) => {
            setAttributes({fieldsToHide});
        };
        return (
            <Fragment>
                <DisplayWithState
                    listId={listId}
                    fieldsToHide={fieldsToHide}
                    Fallback={() => (
                        <Placeholder>
                            Use Block Settings For Form
                        </Placeholder>
                    )}
                />
                <InspectorControls>
                    <EditWithState
                        fieldsToHide={fieldsToHide}
                        setFieldsToHide={setFieldsToHide}
                        listId={listId}
                        accountId={parseInt(accountId,10)}
                        onChangeAccountId={setAccountId}
                        setListId={setListId}
                    />
                </InspectorControls>
            </Fragment>)


    },

    save: Save,
};
