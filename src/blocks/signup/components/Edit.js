import  {Fragment,Component} from '@wordpress/element';
import {SelectList} from "@calderajs/forms";
import {fieldFactory,Field,FieldWrapper,FieldSet,InputField} from '@calderajs/components';
import {select} from "@wordpress/data";
import {CALDERA_MAILCHIMP_STORE} from "../../../store";

class ApiKeySettings extends Component {


	constructor(props) {
		super(props);
		this.state = {
			apiKey: ''
		};
		this.setApiKey = this.setApiKey.bind(this);
		this.onSaveApiKey = this.onSaveApiKey.bind(this);
	}


	setApiKey(apiKey) {
		this.setState({apiKey})
	}
	onSaveApiKey(){
		this.props.adminApiClient.saveApiKey(this.state.apiKey);
		this.setState({apiKey:''});
	}

	render() {
		const {instanceId} = this.props;
		const {apiKey} = this.state;

		return (

			<Fragment>
				<Field
					field={{
						fieldType: 'text',
						value: apiKey,
						label: 'New API Key',
						fieldId: 'caldera-mc-api-key',
						required: true
					}}
					onChange={this.setApiKey}
					value={apiKey}
					instanceId={`caldera-mc-select-${instanceId}`}
				/>
				<button
					onClick={this.onSaveApiKey}
					id={`${instanceId}-mc-add-api-key`}

					title={'Save API Key'}
				>
					Save API Key
				</button>

			</Fragment>
		);
	}


}
const FieldOptions = ({accountId,listId,instanceId,setFieldsToHide, fieldsToHide}) => {

	const getList = (listId ) => {
		const list =  accountId && listId ? select(CALDERA_MAILCHIMP_STORE).getList(accountId, listId) : false;
		return  list;

	};

	const getMergeFields = (list) => {
		return list.hasOwnProperty('mergeFields' ) ? Object.values(list.mergeFields.mergeVars) : [];
	};

	const getGroupFields = (list) => {
		return list.hasOwnProperty('groupFields' ) ? Object.values(list.groupFields.groups) : [];
	};

	const list = getList(listId);

	const mergeHiderFieldId = 'mc-hide-merge-fields-' + instanceId;
	const groupHiderFieldId = 'mc-hide-group-fields-' + instanceId;
	const mergeOptions = [];
	const groupOptions = [];
	const values = {};
	if(list){

		const mergeFields = getMergeFields(list);
		const groupFields = getGroupFields(list);


		mergeFields.forEach(field => {
			const label = `${field.name}`;
			const value = field.tag;
			values[value] = fieldsToHide.hasOwnProperty(value) ? fieldsToHide[value] : false;
			mergeOptions.push({
				label,
				value,
				id:`${listId}-${field.mergeId}`,

			})

		});


		groupFields.forEach(group => {
			const label = `${group.title}`;
			const value = group.groupId;
			values[value] = fieldsToHide.hasOwnProperty(value) ? fieldsToHide[value] : false;
			groupOptions.push({
				id:`${listId}-${group.groupId}`,
				label,
				value,
			})
		});




	}else{
		return  <Fragment/>;
	}



	if( accountId && listId ){
		return  (
			<div>
				<FieldWrapper
					id={mergeHiderFieldId}
					fieldType={'checkboxes'}
				>
					<FieldSet
						legend={`Hide Merge Fields`}

						fieldType={'checkboxes'}
					>
						{mergeOptions.map( mergeOption => {
							const{id,label,value} = mergeOption;
							const checked = values[value];
							return (
								<InputField
									fieldId={id}
									label={label}
									html5type={'checkbox'}
									value={checked}
									onChange={(newValue) => {
										setFieldsToHide( {
											...values,
											[value]:newValue,
										});
									}}
								/>
							)
						}) }

					</FieldSet>
				</FieldWrapper>
				<FieldWrapper
					id={groupHiderFieldId}

					fieldType={'checkboxes'}
				>
					<FieldSet
						fieldType={'checkboxes'}
						legend={`Hide Group Fields`}					>
						{groupOptions.map( mergeOption => {
							const{id,label,value} = mergeOption;
							const checked = values[value];
							return (
								<InputField
									fieldId={id}
									label={label}
									html5type={'checkbox'}
									value={checked}
									onChange={(newValue) => {
										setFieldsToHide( {
											...values,
											[value]:newValue,
										});
									}}
								/>
							)
						}) }

					</FieldSet>
				</FieldWrapper>
			</div>
		)
	}


};


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
	const hasOptions =chooseAccountField.options.length;
	if (!chooseAccountField.options.length) {
		chooseAccountField.options.push({
			value: null,
			label: '--'
		})
	}



	const ChooseAccount = ({hasOptions,chooseAccountField,instanceId,onChangeAccountId,accountId}) => {
		if (hasOptions) {
			return fieldFactory({
				...chooseAccountField,
				value: parseInt(accountId,10),
				fieldId: `${chooseAccountField.fieldId}-${instanceId}`
			}, onChangeAccountId)
		}
		return  <Fragment/>
	};

	const chooseAccountProps = {hasOptions,chooseAccountField,instanceId,onChangeAccountId,accountId};
	const fieldOptionProps = {accountId,listId,instanceId,setFieldsToHide, fieldsToHide};
	return (
		<Fragment>
			<ul>
				<li>{accountId}</li>
				<li>{listId}</li>
			</ul>
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



