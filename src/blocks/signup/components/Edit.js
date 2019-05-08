import React, {Fragment} from 'react';
import {SelectList} from "../../../components/Admin/SelectList/SelectList";
import {Field} from '@calderajs/components';

class ApiKeySettings extends React.Component {


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


export const Edit = (
	{
		accountId,
		chooseAccountField,
		onChangeAccountId,
		adminApiClient,
		setListId, listId, listFieldConfig, instanceId
	}
) => {
	const initialValues = {};

	function getListIdFromValues(values) {
		return '';
	}

	if (!chooseAccountField.hasOwnProperty('options')) {
		chooseAccountField.options = [];
	}
	let hasOptions =false;
	if (!chooseAccountField.options.length) {
		chooseAccountField.options.push({
			value: null,
			label: '--'
		})
	}else{
		hasOptions = true;
	}
	return (
		<Fragment>
			<ApiKeySettings
				adminApiClient={adminApiClient}
				instanceId={instanceId}
			/>
			{hasOptions &&
				<Field
					field={{
						...chooseAccountField,
						value: accountId,
						fieldId: `${chooseAccountField.fieldId}-${instanceId}`
					}}
					onChange={(newValue) => {
						onChangeAccountId(newValue);
					}}
				/>
			}

			{accountId &&
				<SelectList
					listFieldConfig={listFieldConfig[0]}
					listId={listId}
					instanceId={instanceId}
					setListId={setListId}
				/>
			}

		</Fragment>
	);
}



