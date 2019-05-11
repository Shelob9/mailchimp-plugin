/**
 * Prepare body of API request
 *
 * @param values
 * @param processor
 * @return {{email: *, mergeFields, groupFields, listId: *}}
 */
 const prepareData = (values,processor) => {
	const getValue = (key) => {
		if (values.hasOwnProperty(key)) {
			return values[key];
		}
		return null;
	};
	const {listId} = processor;
	const mergeFields = {};
	const groupFields = {};
	processor.mergeFields.forEach(field => {
		mergeFields[field] = getValue(field);
	});
	processor.groupFields.forEach(field => {
		groupFields[field] = getValue(field);
	});

	console.log(values,processor.emailField,getValue(processor.emailField))
	return {
		email: getValue(processor.emailField),
		mergeFields,
		groupFields,
		listId
	};

};

/**
 * Create new subscriber
 *
 * @param values
 * @param processor
 * @return {*}
 */
const createSubscriber = (values,processor) => {
	const {submitUrl} = processor;
	return fetch(submitUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(prepareData(values,processor))
	});
};

/**
 * Update a subscriber
 *
 * @param values
 * @param processor
 * @return {*}
 */
 const updateSubscriber = (values,processor) => {
	 const {submitUrl} = processor;
	 return fetch(submitUrl, {
		 method: 'PUT',
		 headers: {
			 'Content-Type': 'application/json',
		 },
		 body: JSON.stringify(prepareData(values,processor))
	 });
 };

/**
 * Get the Mailchimp survey form
 *
 * @param apiRoot
 * @param token
 * @param listId
 */
const getForm = (
	{
		apiRoot,
		token,
		listId
	}
) => {
	const url = `${apiRoot}/forms/${listId}?asUiConfig=1&token=${token}`;
	return fetch(url);
};

export {
	getForm,
	prepareData,
	createSubscriber,
	updateSubscriber
}
