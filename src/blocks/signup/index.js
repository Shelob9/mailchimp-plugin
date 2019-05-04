export const name = 'caldera-mailchimp/signup';

export const options = {
	title: 'Mailchimp Signup Form',

	description: 'Render another sample block.',

	icon: 'images-alt',

	category: 'widgets',

	edit() {
		return (
			<div>
				<h2>Block B preview</h2>
			</div>
		);
	},

	save() {
		return (
			<div>
				<h2>Block B!</h2>
			</div>
		);
	},
};
