import {DisplayA} from "./components/DisplayA";

import {EditA} from "./components/EditA";
export const name = 'caldera-mailchimp/sample';
const attributes = {
	message: {
		type: 'string',
		default: 'Type your message'
	},
	useBold: {
		type: 'boolean',
		default: false,
	}
}
export const options = {
	title: 'Sample Block A',

	description: 'Render a sample block.',

	icon: 'image-filter',
	category: 'widgets',
	attributes,
	edit({attributes,setAttributes}) {
		const {message,useBold} = attributes;
		const onChangeMessage = (message ) => setAttributes({message});
		const onChangeBold = (useBold ) => setAttributes({useBold});
			return (<div>
				<DisplayA
					message={message}
					useBold={useBold}
				/>
				<EditA
					message={message}
					useBold={useBold}
					onChangeMessage={onChangeMessage}
					onChangeBold={onChangeBold}
				/>
			</div>)


	},

	save({attributes}) {
	return null;
	},
};
