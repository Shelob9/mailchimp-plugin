import {prepareData} from "./publicClient";

/**
 * Get all lists for an account
 *
 * @param apiRoot
 * @param token
 * @param accountId
 */
const getLists = (
	{
		apiRoot,
		token,
		accountId
	}
) => {
	const url = `${apiRoot}/lists?accountId=${accountId}&asUiConfig=0&token=${token}`;
	return fetch(url);
};

/**
 * Get the form field config for selecting lists of an account
 *
 * @param apiRoot
 * @param token
 * @param accountId
 */
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

/**
 * Get the form field configs for a list
 *
 * @param apiRoot
 * @param token
 * @param listId
 */
const getListUi = (
	{
		apiRoot,
		token,
		listId
	}
) => {
	const url = `${apiRoot}/forms/${listId}?asUiConfig=1&token=${token}`;
	return fetch(url);
};

/**
 * Save an API key
 *
 * @param apiRoot
 * @param token
 * @param apiKey
 */
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
};

/**
 * Get all accounts
 *
 * @param apiRoot
 * @param token
 */
const getAccounts = (
	{
		apiRoot,
		token
	}
) =>{
	const url = `${apiRoot}/accounts?asUiConfig=0&token=${token}`;
	return fetch(url);
};

/**
 * Get the field config for selecting accounts
 *
 * @param apiRoot
 * @param token
 */
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
		getListUi(listId){
			return getListUi({
				apiRoot,
				token,
				listId
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

