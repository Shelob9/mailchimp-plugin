import {CALDERA_MAILCHIMP_STORE} from "../../store";
import {Fragment} from '@wordpress/element';
import {fieldFactory, Field, FieldWrapper, FieldSet, InputField} from '@calderajs/components';
import {select} from "@wordpress/data";

export const FieldOptions = ({accountId, listId, instanceId, setFieldsToHide, fieldsToHide}) => {

    const getList = (listId) => {
        const list = accountId && listId ? select(CALDERA_MAILCHIMP_STORE).getList(accountId, listId) : false;
        return list;

    };

    const getMergeFields = (list) => {
        return list.hasOwnProperty('mergeFields') ? Object.values(list.mergeFields.mergeVars) : [];
    };

    const getGroupFields = (list) => {
        return list.hasOwnProperty('groupFields') ? Object.values(list.groupFields.groups) : [];
    };

    const list = getList(listId);

    const mergeHiderFieldId = 'mc-hide-merge-fields-' + instanceId;
    const groupHiderFieldId = 'mc-hide-group-fields-' + instanceId;
    const mergeOptions = [];
    const groupOptions = [];
    const values = {};
    if (list) {

        const mergeFields = getMergeFields(list);
        const groupFields = getGroupFields(list);


        mergeFields.forEach(field => {
            const label = `${field.name}`;
            const value = field.tag;
            values[value] = fieldsToHide.hasOwnProperty(value) ? fieldsToHide[value] : false;
            mergeOptions.push({
                label,
                value,
                id: `${listId}-${field.mergeId}`,

            })

        });


        groupFields.forEach(group => {
            const label = `${group.title}`;
            const value = group.groupId;
            values[value] = fieldsToHide.hasOwnProperty(value) ? fieldsToHide[value] : false;
            groupOptions.push({
                id: `${listId}-${group.groupId}`,
                label,
                value,
            })
        });


    } else {
        return <Fragment/>;
    }


    if (accountId && listId) {
        return (
            <div>
                <FieldWrapper
                    id={mergeHiderFieldId}
                    fieldType={'checkboxes'}
                >
                    <FieldSet
                        legend={`Hide Merge Fields`}

                        fieldType={'checkboxes'}
                    >
                        {mergeOptions.map(mergeOption => {
                            const {id, label, value} = mergeOption;
                            const checked = values[value];
                            return (
                                <InputField
                                    fieldId={id}
                                    label={label}
                                    html5type={'checkbox'}
                                    value={checked}
                                    onChange={(newValue) => {
                                        setFieldsToHide({
                                            ...values,
                                            [value]: newValue,
                                        });
                                    }}
                                />
                            )
                        })}

                    </FieldSet>
                </FieldWrapper>
                <FieldWrapper
                    id={groupHiderFieldId}

                    fieldType={'checkboxes'}
                >
                    <FieldSet
                        fieldType={'checkboxes'}
                        legend={`Hide Group Fields`}>
                        {groupOptions.map(mergeOption => {
                            const {id, label, value} = mergeOption;
                            const checked = values[value];
                            return (
                                <InputField
                                    fieldId={id}
                                    label={label}
                                    html5type={'checkbox'}
                                    value={checked}
                                    onChange={(newValue) => {
                                        setFieldsToHide({
                                            ...values,
                                            [value]: newValue,
                                        });
                                    }}
                                />
                            )
                        })}

                    </FieldSet>
                </FieldWrapper>
            </div>
        )
    }


};
