import {Display} from "./components/Display";
import {Edit} from "./components/Edit";
import {InspectorControls} from '@wordpress/editor';
import {Fragment} from "react";
import {select } from '@wordpress/data';
import {CALDERA_MAILCHIMP_STORE} from "../../store";

export const name = 'caldera-mailchimp/signup';

const attributes = {
	listId: {
		type: 'string',
		default: 'List Id'
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
export function SignupBlockEdit({attributes, setAttributes, instanceId}) {
	const {listId} = attributes;
	const form = {};//@todo state
	const listFields = {}; //@todo
	const onChangeListId = (listId) => setAttributes({listId});
	console.log(select( CALDERA_MAILCHIMP_STORE).getAccounts());
	console.log(select( CALDERA_MAILCHIMP_STORE).getAccounts());
	return (
		<Fragment>
			<Display
				listId={listId}
				form={form}
				Fallback={() => (<div>Choose</div>)}
			/>
			<InspectorControls>
				<Edit
					listFields={listFields}
					listId={listId}
					onChangeListId={onChangeListId}
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
		return SignupBlockEdit({attributes,setAttributes,instanceId});
	},
	save({attributes}) {
		return null;
	},
};
