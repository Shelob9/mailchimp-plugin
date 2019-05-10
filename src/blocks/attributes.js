export const attributes = {
    listId: {
        type: 'string',
        default: '',
        source: 'attribute',
        selector: 'span.calderaMailchimp',
        attribute: 'data-list',
    },
    accountId: {
        type: 'number',
        default: 0,
    },


};