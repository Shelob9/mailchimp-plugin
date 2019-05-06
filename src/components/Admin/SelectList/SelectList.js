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
			field={listFieldConfig}
			onChange={(newValue)=>{
				setListId(newValue);
			}}
			instanceId={`caldera-mc-select-${instanceId}` }
		/>
	</Fragment>
);
