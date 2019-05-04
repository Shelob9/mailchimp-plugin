import React from 'react';

export const DisplayA = ({message,useBold = false}) => {
	if( useBold ){
		return <span><strong>{message}</strong></span>
	}

	return <span>{message}</span>
};

