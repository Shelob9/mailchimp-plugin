import { PluginPostStatusInfo } from '@wordpress/edit-post';

export const name = 'calderamailchimp-plugin-a';

export const options = {
	icon: 'star-empty',

	render() {
		return (
			<PluginPostStatusInfo>
				<p>Plugin A is loaded!</p>
			</PluginPostStatusInfo>
		);
	},
};
