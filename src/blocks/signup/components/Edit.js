import {Fragment, Component} from '@wordpress/element';
import {SelectList} from "@calderajs/forms";
import {fieldFactory, Field, FieldWrapper, FieldSet, InputField} from '@calderajs/components';
import {FieldOptions} from "../../components/FieldOptions";
import {ApiKeySettings} from "../../components/ApiKeySettings";


export const Edit = (
    {
        accountId,
        chooseAccountField,
        adminApiClient,
        onChangeAccountId,
        setListId,
        listId,
        listFieldConfig,
        instanceId,
        setFieldsToHide,
        fieldsToHide
    }
) => {

    if (!chooseAccountField.hasOwnProperty('options')) {
        chooseAccountField.options = [];
    }
    const hasOptions = chooseAccountField.options.length;
    if (!chooseAccountField.options.length) {
        chooseAccountField.options.push({
            value: null,
            label: '--'
        })
    }



    const ChooseAccount = ({hasOptions, chooseAccountField, instanceId, onChangeAccountId, accountId}) => {
        if (hasOptions) {
            return fieldFactory({
                ...chooseAccountField,
                value: parseInt(accountId, 10),
                fieldId: `${chooseAccountField.fieldId}-${instanceId}`
            }, onChangeAccountId)
        }
        return <Fragment/>
    };

    const chooseAccountProps = {hasOptions, chooseAccountField, instanceId, onChangeAccountId, accountId};
    const fieldOptionProps = {accountId, listId, instanceId, setFieldsToHide, fieldsToHide};
    return (
        <Fragment>
            <ApiKeySettings
                adminApiClient={adminApiClient}
                instanceId={instanceId}
            />
            <ChooseAccount {...chooseAccountProps} />

            {accountId &&
            <SelectList
                listFieldConfig={listFieldConfig[0]}
                listId={listId}
                instanceId={instanceId}
                setListId={setListId}
            />
            }
            <FieldOptions
                {...fieldOptionProps}
            />

        </Fragment>
    );
}



