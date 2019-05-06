
const getListsUi = (
	{
		apiRoot,
		token
	}
) => {
	const url = `${apiRoot}/lists?token=${token}&asUiConfig=1`
	return fetch(url);
};


const getAccounts = (
	{
		apiRoot,
		token
	}
) =>{
	const url = `${apiRoot}/accounts?token=${token}&asUiConfig=0`;
	return fetch(url);
};

const getAccountsUi = (
	{
		apiRoot,
		token
	}
) =>{
	const url = `${apiRoot}/accounts?token=${token}&asUiConfig=1`;
	return fetch(url);
};


