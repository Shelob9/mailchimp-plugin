import React from 'react';
import {mailChimpTestForm} from "../../../components/mailChimpTestForm.fixture";
import MailChimpForm from "../../../components/MailChimpForm";

export const Display = ({listId,form,Fallback}) => {
	if( listId ){

		if( 1 === 8 ){
			return <MailChimpForm
				form={form}
				onSubmit={(values) => alert(JSON.stringify(values))}
			/>
		}
		return <div>{listId}</div>

	}

	return <Fallback/>
};

