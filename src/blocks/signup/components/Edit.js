import React, {Fragment, useState} from 'react';
import {HorizontalForm} from '@calderajs/forms';
import {SelectList} from "../../../components/Admin/SelectList/SelectList";
import {AddApiKey} from "../../../components/Admin/AddApiKey/AddApiKey";

export const Edit = ({setListId, listId, listFieldConfig, instanceId}) => {
	const initialValues = {};
	function getListIdFromValues(values){
		return '';
	}

	const showListSelect = false;
	return (
		<Fragment>
			<AddApiKey
				apiKey={''}
				onChange={(newValue) => console.log(newValue)}
			/>
			{ showListSelect &&
				<SelectList
					listFieldConfig={listFieldConfig}
					listId={listId}
					instanceId={instanceId}
					setListId={setListId}
				/>

			}


		</Fragment>
	);
}



