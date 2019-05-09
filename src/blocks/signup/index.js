import {Display} from "./components/Display";
import {Edit} from "./components/Edit";
import {InspectorControls} from '@wordpress/editor';
import {Fragment} from "react";
import {select,dispatch } from '@wordpress/data';
import {CALDERA_MAILCHIMP_STORE} from "../../store";
import {Placeholder} from '@wordpress/components';
export const name = 'caldera-mailchimp/signup';

const attributes = {
	listId: {
		type: 'string',
		default: ''
	},
	accountId: {
		type: 'integer',
		default: 0
	},


};

/**
 *
 * @param attributes
 * @param setAttributes
 * @param instanceId
 * @return {*}
 * @constructor
 */
export function SignupBlockEdit(
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

	const form = {};//@todo state



	return (
		<Fragment>
			<Display
				listId={listId}
				form={form}
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

export const options = {
	title: 'Mailchimp Signup Form',
	description: 'Render another sample block.',
	icon: 'images-alt',
	category: 'widgets',
	edit({attributes,setAttributes,instanceId}) {
		const {
			listId,
			accountId
		} = attributes;
		const setAccountId = (accountId) => {
			setAttributes({accountId});
		};
		const setListId = (listId) =>{
			setAttributes({listId});
		};

		let listFields = [];
		if (accountId) {
			select(CALDERA_MAILCHIMP_STORE).getClient().getAccountsUi(accountId)
				.then(r => r.json() )
				.then(r => {
					dispatch(CALDERA_MAILCHIMP_STORE).setListsUi(r);
				}
			);
		 	listFields = select(CALDERA_MAILCHIMP_STORE).getListsUi(accountId);
		}
		if( Array.isArray(listFields) && ! listId  && listFields.length){
			if( listFields[0].options.length){
				setListId(listFields[0].options[1].value);
			}
		}
		const chooseAccountField =  select(CALDERA_MAILCHIMP_STORE).getAccountsUi();
		const adminApiClient = 	select(CALDERA_MAILCHIMP_STORE).getClient();
		return SignupBlockEdit({
			listId,
			setListId,
			accountId,
			setAccountId,
			instanceId,
			listFields,
			chooseAccountField,
			adminApiClient
		});
	},
	save({attributes,className}) {
		return null;
	},
};


