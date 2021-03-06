import {
	mailChimpApi
} from "@calderajs/forms";
const {
	AdminClient
} = mailChimpApi;

let CALDERA_MAILCHIMP = window.CALDERA_MAILCHIMP || {
	apiRoot: '',
	token: ''
};
const DEFAULT_STATE = {
	accounts: [],
	lists: {},
	apiRoot: CALDERA_MAILCHIMP.apiRoot,
	token: CALDERA_MAILCHIMP.token,
	accountsUi: {},
	listsUi: {},//UI Config for choosing a list
	listUi: {},//Ui config for fields of a list
	pendingKey:'',
	wpApiRoot: CALDERA_MAILCHIMP.wpApiRoot
};
const client = new AdminClient(CALDERA_MAILCHIMP.apiRoot,CALDERA_MAILCHIMP.token);

const SET_ACCOUNTS = 'calderaMailChimp/setAccounts';
const SET_ACCOUNTS_UI = 'calderaMailChimp/setAccountsUi';
const SET_LISTS = 'calderaMailChimp/setLists';
const SET_LISTS_UI = 'calderaMailChimp/setListsUi';
const SET_LIST_UI = 'calderaMailChimp/setListUi';
const SAVE_API_KEY = 'calderaMailChimp/saveApiKey';
const actions = {
	setAccounts(accounts) {
		return {
			type: SET_ACCOUNTS,
			accounts,
		};
	},
	setLists(accountId,lists){
		return{
			type: SET_LISTS,
			accountId,
			lists,
		}
	},
	setAccountsUi(fields){
		return{
			type: SET_ACCOUNTS_UI,
			fields,
		}
	},
	setListsUi(accountId,fields){
		return {
			type: SET_LISTS_UI,
			fields,
			accountId,
		}
	},
	setListUi(listId,fields){
		return {
			type: SET_LIST_UI,
			fields,
			listId,
		}
	},
	saveApiKey(apiKey){
		return{
			type: SAVE_API_KEY,
			apiKey
		}
	}

};

function findAccountListsInState(state, accountId) {
	return state.lists.hasOwnProperty(accountId) ? state.lists[accountId] : [];
}

export const CALDERA_MAILCHIMP_STORE = 'caldera-mailchimp';
export const calderaMailChimpStore = {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case SET_ACCOUNTS:
				return {
					...state,
					accounts: action.accounts
				};

			case SET_LISTS:
				return {
					...state,
					lists: {
						...state.lists,
						[action.accountId]: action.lists
					},
				};
			case SET_ACCOUNTS_UI:
				return {
					...state,
					accountsUi: action.fields
				};
			case SET_LISTS_UI:
				return {
					...state,
					listsUi: {
						...state.listsUi,
						[action.accountId]:action.fields,
					}
				}
			case SET_LIST_UI:
				return {
					...state,
					listUi: {
						...state.listUi,
						[action.listId]:action.fields,
					}
				};
			case SAVE_API_KEY:{
				return {
					...state,
					pendingKey:action.apiKey
				}
			}
		}

		return state;
	},

	actions,

	selectors: {
		getAccounts(state) {
			return state.accounts;
		},
		getAccount(state, accountId) {
			return state.accounts.find(account => accountId === account.id)
		},
		getAccountsUi(state){
			return state.accountsUi;
		},
		getLists(state, accountId) {
			return findAccountListsInState(state, accountId);
		},
		getList(state, accountId, listId) {
			const lists = findAccountListsInState(state, accountId);
			if (!lists.length) {
				return false;
			}
			return lists.find(list => listId === list.listId);
		},
		getListsUi(state,accountId){
			return state.listsUi[accountId] || [];
		},
		getToken(state){
			return state.token
		},
		getApiRoot(state){
			return state.apiRoot;
		},
		getWpApiRoot(state){
			return state.wpApiRoot;
		},
		getApiKey(state,apiKey){
			return state.saveApiKey = apiKey;
		},
		getClient(state){
			return client;
		},
		getListUi(state,listId){
			return state.listUi[listId];
		}
	},
	resolvers: {
		async getAccounts(){
			const accounts = await client.getAccounts().then( r => r.json());
			return actions.setAccounts(accounts);
		},
		async getAccountsUi(){
			const fields = await client.getAccountsUi().then( r => r.json());
			return actions.setAccountsUi(fields);
		},
		async getLists(accountId)//can be apiKey or list ID
		{
			const lists = await client.getLists(accountId).then( r => r.json());
			return actions.setLists(accountId,lists);
		},
		async getListsUi(accountId){
			const fields = await client.getListsUi(accountId).then( r => r.json());
			return actions.setListsUi(accountId,fields);
		},
		async getListUi(listId){
			const form = await client.getListUi(listId).then( r => r.json());
			return actions.setListUi(listId,form);
		},

	},
};
