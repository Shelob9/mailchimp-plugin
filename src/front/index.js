import {blockClassNameIdentifiers} from "../blocks/blockClassNameIdentifiers";
import React from "react";
import ReactDOM from "react-dom";
import {
    CalderaMailChimpForm,
    CalderaMailChimpSurveyForm
} from "@calderajs/forms";
/**
 * Create the ID attribute string

 *
 * @param element
 * @param listId
 * @returns {string}
 */
function createElementId(element, listId) {
    return `${element.offsetTop}-${listId}`;
}

/**
 * Set the ID attribute of the element
 *
 * @param element
 * @param listId
 * @returns {*}
 */
function setElementId(element, listId) {
    element.id = createElementId(element, listId);
    return element
}


export function LoadAllCalderaMailChimpForms({apiRoot, token, wpNonce}) {
    const {signup, survey} = blockClassNameIdentifiers;
    //Find elements to replace with forms
    const elements = document.querySelectorAll(`.${signup}`);
    const elementsSurvey = document.querySelectorAll(`.${survey}`);

    //If found
    if (elements.length || elementsSurvey.length) {
        //Check if token is available. If not request one from API
        const promise = new Promise(function (resolve, reject) {

            //Have token?
            if (token) {
                //resolve now
                resolve({token, apiRoot});
            } else {
                //Get token
                //if in WordPress, pass the WordPress nonce
                const url = wpNonce ? `${apiRoot}/token?_wpnonce=${wpNonce}` : `${apiRoot}/token`;
                fetch(url, {
                    method: 'POST'
                })
                    .then(r => r.json())
                    .then(r => {
                        //resolve with token
                        token = r.token;
                        resolve({token, apiRoot});
                    })
                    .catch(e => reject(e));
            }
        });

        //Check (optionally GET) token - then load
        promise.then(function ({token, apiRoot}) {
            if (elements.length) {
                const client = new LoadCalderaMailChimpForms(elements, token, apiRoot);
                client.mountAll();
            }
            if (elementsSurvey.length) {
                const client = new LoadCalderaMailChimpSurveyForms(elementsSurvey, token, apiRoot);
                client.mountAll();
            }
        });
    }
}

/**
 * Mount signup form(s) on elements
 *
 * @param elements
 * @param token
 * @param apiRoot
 * @returns {{mountAll(): void, mount: mount}}
 * @constructor
 */
function LoadCalderaMailChimpForms(elements, token, apiRoot) {
    return {
        mountAll() {
            if (elements.length) {
                elements.forEach(element => {
                    const listId = element.dataset.list;
                    this.mount(element, listId);
                })
            }
        },
        mount: (element, listId) => {
            setElementId(element, listId);

            function createComponent() {
                return React.createElement('div',
                    {
                        fallback: React.createElement('div', {}, 'Loading'),
                    },
                    [
                        React.createElement(CalderaMailChimpForm, {
                            listId,
                            token,
                            apiRoot,
                            key: createElementId(element, listId)
                        })
                    ]
                )
            }

            const App = createComponent();

            ReactDOM.render(App, document.getElementById(createElementId(element, listId)));

        }

    }
}

/**
 * Mount survey form(s) on DOM Element(s)
 *
 * @param elements
 * @param token
 * @param apiRoot
 * @returns {(function(*, *=, *=): *)&{mount: mount}}
 * @constructor
 */
function LoadCalderaMailChimpSurveyForms(elements, token, apiRoot) {

    return {
        ...LoadCalderaMailChimpForms,
        mountAll() {
            if (elements.length) {
                elements.forEach(element => {
                    const listId = element.dataset.list;
                    this.mount(element, listId);
                })
            }
        },
        mount: (element, listId) => {
            setElementId(element, listId);

            function createComponent() {
                return React.createElement('div',
                    {
                        fallback: React.createElement('div', {}, 'Loading'),
                    },
                    [
                        React.createElement(CalderaMailChimpSurveyForm, {
                            listId,
                            token,
                            apiRoot,
                            key: createElementId(element, listId)
                        })
                    ]
                )
            }

            const App = createComponent();
            ReactDOM.render(App, document.getElementById(createElementId(element, listId)));
        }
    }
}

export {LoadCalderaMailChimpSurveyForms};
export {LoadCalderaMailChimpForms};
