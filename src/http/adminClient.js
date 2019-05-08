import {prepareData} from "./publicClient";

const getLists = (
	{
		apiRoot,
		token,
		accountId
	}
) => {
	const url = `${apiRoot}/lists?accountId=${accountId}&token=${token}&asUiConfig=0`
	return fetch(url);
};

const getListsUi = (
	{
		apiRoot,
		token,
		accountId
	}
) => {
	const url = `${apiRoot}/lists?accountId=${accountId}&token=${token}&asUiConfig=1`
	return fetch(url);
};

const saveApiKey = ({
	apiRoot,
	token,
	apiKey
}) => {
	const url =`${apiRoot}/accounts`
	return fetch(url,{
		method: 'PUT',
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
		getLists(accountId){
			return getLists({
				apiRoot,
				token,
				accountId
			});
		},
		getListsUi(accountId){
			return getListsUi({
				apiRoot,
				token,
				accountId
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

