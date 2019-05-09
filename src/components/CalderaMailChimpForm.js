import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {createSubscriber} from "../http/publicClient";
import MailChimpForm from './MailChimpForm';

/**
 * Load remote MailChimp sign up mailChimpTestForm via the WordPress REST API
 *
 * @param listId
 * @param apiRoot
 * @param token
 * @param hideOnSubmit
 * @return {*}
 * @constructor
 */
function CalderaMailChimpForm({listId, apiRoot,token,hideOnSubmit}){
	const [isLoaded, setIsLoaded] = useState(false);
	const [form, setForm] = useState({});
	useEffect(() => {
		fetch(`${apiRoot}/forms/${listId}?token=${token}&asUiConfig=1`)
			.then(r => r.json())
			.then(r => {
				setForm(r);
				setIsLoaded(true);
			});

	}, [isLoaded, setIsLoaded]);
	return <MailChimpForm  form={form} onSubmit={createSubscriber} hideOnSubmit={hideOnSubmit}/>


}


CalderaMailChimpForm.propTypes = {
	token: PropTypes.string.isRequired,
	listId: PropTypes.string.isRequired,
	apiRoot: PropTypes.string,
	hideOnSubmit: PropTypes.bool,
};

CalderaMailChimpForm.defaultProps = {
	hideOnSubmit: true,
	apiRoot: 'https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/v1/lists'
};
export default CalderaMailChimpForm;
