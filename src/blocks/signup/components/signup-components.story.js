import React from 'react';
import {storiesOf} from '@storybook/react';
import {Button} from '@storybook/react/demo';
import {Display} from "./Display";
import {Edit} from "./Edit";
import {mailChimpTestForm} from "../../../components/mailChimpTestForm.fixture";
import {SignupBlockEdit} from "../index";

const listId = 'ff';
const attributes = {
	listId
};
const setAttributes = (newValues) => console.log(newValues);
const instanceId = 'instanceIdIsThis';
storiesOf('The signup block', module)
	.add('Signup Block Edit UI', () => (
		<SignupBlockEdit
			attributes={attributes} setAttributes={setAttributes} instanceId={instanceId}
		/>
	))
	.add('Display component', () => (
		<Display
			listId={listId}
			form={mailChimpTestForm}
			Fallback={() => (<div>Choose</div>)}
		/>
	))
	.add('Edit Component', () => (
		<Edit
			listId={'listId'}
			onChangeListId={(values) => console.log(values)}
			listFields={[]}//@todo mock for this!
			instanceId={'foo'}
		/>
	));
