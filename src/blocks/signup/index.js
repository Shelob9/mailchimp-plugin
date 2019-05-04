import {Display} from "./components/Display";
import {Edit} from "./components/Edit";

export const name = 'caldera-mailchimp/signup';
const attributes = {
	listId: {
		type: 'string',
		default: 'List Id'
	},

}
export const options = {
	title: 'Mailchimp Signup Form',

	description: 'Render another sample block.',

	icon: 'images-alt',

	category: 'widgets',

	edit({attributes,setAttributes,instanceId}) {
		const {listId} = attributes;
		const form = {};//@todo state
		const listFields = {}; //@todo
		const onChangeListId = (listId ) => setAttributes({listId});
		return (<div>
			<Display
				listId={listId}
				form={form}
				Fallback={() => (<div>Choose</div>)}
			/>
			<Edit
				listFields={listFields}
				listId={listId}
				onChangeListId={onChangeListId}
				instanceId={instanceId}
			/>
		</div>)


	},

	save({attributes}) {
		return null;
	},
};
