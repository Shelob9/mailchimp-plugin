import React from 'react';
import {TextControl,RadioControl} from '@wordpress/components';
export const EditA = ({message,onChangeMessage,useBold,onChangeBold}) =>
	 (
		<div>
			<TextControl
				className={'edit-a-message'}
				label={'The Message'}
				value={message}
				onChange={onChangeMessage}
			/>
			<RadioControl
				className={'edit-a-use-bold'}
				options={ [
					{ label: 'Bold', value: true },
					{ label: 'No Special Style', value: false },
				] }
				label={'Use Bold'}
				value={useBold}
				onChange={(useBold) => {
					onChangeBold((useBold == 'true'))
				}}
			/>
		</div>
	);


