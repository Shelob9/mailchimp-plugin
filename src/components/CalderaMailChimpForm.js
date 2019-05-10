import {useEffect, useState,useRef} from "@wordpress/element";
import PropTypes from 'prop-types';
import {createSubscriber} from "../http/publicClient";
import MailChimpForm from './MailChimpForm';
import {PacmanLoader} from "react-spinners";
import React from "react";

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
	const lastListId = useRef(listId);
	const [isLoaded, setIsLoaded] = useState(false);
	const [form, setForm] = useState({});
	const Spinner = () => (
		<div><PacmanLoader/></div>
	);
	useEffect(() => {
		fetch(`${apiRoot}/forms/${listId}?token=${token}&asUiConfig=1`)
			.then(r => r.json())
			.then(r => {
				lastListId.current = listId;
				setForm(r);
				setIsLoaded(true);
			});

	}, [isLoaded, setIsLoaded,listId, apiRoot,token,setForm]);
	if (isLoaded && lastListId.current === listId) {
		return <MailChimpForm form={form} onSubmit={createSubscriber} hideOnSubmit={hideOnSubmit} listId={lastListId.current}/>
	} else {
		return  <Spinner />
	}


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
