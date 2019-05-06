import React, {Fragment} from 'react'
import {HorizontalForm} from '@calderajs/forms';

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
export const SelectList = ({listFieldConfig,listId,setList,instanceId}) => (
	<Fragment>
		<HorizontalForm
			fields={[listFieldConfig]}
			initialValues={
				{
					[listFieldConfig.fieldId]:listId
				}
			}
			onChange={(values)=>{
				setList(values[listFieldConfig.fieldId]);
			}}
			instanceId={`caldera-mc-select-${instanceId}` }
		/>
	</Fragment>
);
