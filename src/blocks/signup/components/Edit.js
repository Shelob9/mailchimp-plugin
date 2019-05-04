import React from 'react';
import {HorizontalForm} from '@calderajs/forms';

export const Edit = ({onChangeListId, listId, listFields, instanceId}) => {
	const initialValues = {};
	function getListIdFromValues(values){
		return '';
	}
	return (
		<div>
			<HorizontalForm
				fields={listFields}
				initialValues={initialValues}
				onClose={() => alert('close')}
				onChange={(values) => {
					console.log(values);
					onChangeListId(getListIdFromValues(values))
				}}
				instanceId={instanceId}
			/>
		</div>
	);
}



