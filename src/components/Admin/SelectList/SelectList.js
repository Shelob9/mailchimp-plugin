import React, {Fragment} from 'react'
import {Field} from '@calderajs/components';

/**
 * Select a MailChimp List
 *
 * @param listFieldConfig
 * @param listId
 * @param setList
 * @param instanceId
 * @return {*}
 * @constructor
 */
export const SelectList = ({listFieldConfig,listId,setListId,instanceId}) => (
	<Fragment>
		<Field
			field={{
				...listFieldConfig,
				fieldId: `caldera-mc-select-list-${instanceId}`,
				value: listId,
			}}
			onChange={(newValue)=>{
				setListId(newValue);
			}}
		/>
	</Fragment>
);
