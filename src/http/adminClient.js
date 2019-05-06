
const getListsUi = (
	{
		apiRoot,
		token
	}
) => {
	const url = `${apiRoot}/lists?token=${token}&asUiConfig=true`
	return fetch(url);
};
