import {registerStore} from '@wordpress/data'
let CALDERA_MAILCHIMP = window.CALDERA_MAILCHIMP || {
	apiRoot: '',
	token: ''
};
const DEFAULT_STATE = {
	accounts: [],
	lists: {},
	apiRoot: CALDERA_MAILCHIMP.apiRoot,
	token: CALDERA_MAILCHIMP.token
};


const SET_ACCOUNTS = 'calderaMailChimp/setAccounts';
const SET_LISTS = 'calderaMailChimp/setLists';
const actions = {
	setAccounts(accounts) {
		return {
			type: SET_ACCOUNTS,
			accounts
		};
	},
	setLists(accountId,lists){
		return{
			type: SET_LISTS,
			accountId,
			lists
		}
	},

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
		getToken(state){
			return state.token
		},
		getApiRoot(state){
			return state.apiRoot;
		}
	},

	resolvers: {
		getAccounts(){

		}
	},
};
