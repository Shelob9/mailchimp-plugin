import {prepareData} from "./publicClient";

const getLists = (
	{
		apiRoot,
		token,
		apiKey
	}
) => {
	const url = `${apiRoot}/lists?apiKey=${apiKey}&token=${token}&asUiConfig=0`
	return fetch(url);
};

const getListsUi = (
	{
		apiRoot,
		token,
		apiKey
	}
) => {
	const url = `${apiRoot}/lists?apiKey=${apiKey}&token=${token}&asUiConfig=1`
	return fetch(url);
};

const saveApiKey = ({
	apiRoot,
	token,
	apiKey
}) => {
	const url =`${apiRoot}/accounts`
	return fetch(url,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			apiKey,
			token
		})
	});
}

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

function AdminClient(apiRoot,token) {
	return {
		getAccounts() {
			return getAccounts({apiRoot,token})
		},
		getAccountsUi(){
			return getAccountsUi({apiRoot,token})
		},
		getLists(apiKey){
			return getLists({
				apiRoot,
				token,
				apiKey
			});
		},
		getListsUi(apiKey){
			return getListsUi({
				apiRoot,
				token,
				apiKey
			});
		},
		saveApiKey(apiKey){
			return  saveApiKey({
				apiRoot,
				token,
				apiKey
			});
		}
	};

}

export {
	AdminClient,
	getAccounts,
	getAccountsUi,
	getListsUi,
	getLists,
	saveApiKey
}

