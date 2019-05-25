/** globals CALDERA_MAILCHIMP */
import domReady from '@wordpress/dom-ready';
import React from 'react';
import ReactDOM from 'react-dom';
import CalderaMailChimpForm from './components/CalderaMailChimpForm'
import {blockClassNameIdentifiers} from "./blocks/blockClassNameIdentifiers";
import CalderaMailChimpSurveyForm from "./components/CalderaMailChimpSurveyForm";

window.CALDERA_MAILCHIMP = window.CALDERA_MAILCHIMP || {};
domReady(function () {
    const {signup, survey} = blockClassNameIdentifiers;
    //Find elements to replace with forms
    const elements = document.querySelectorAll(`.${signup}`);
    const elementsSurvey = document.querySelectorAll(`.${survey}`);

    //If found
    if (elements.length || elementsSurvey.length) {
        //Check if token is available. If not request one from API
        const promise = new Promise(function (resolve, reject) {
            let token = CALDERA_MAILCHIMP.hasOwnProperty('token') ? CALDERA_MAILCHIMP.token : false;
            const apiRoot = CALDERA_MAILCHIMP.apiRoot;
            //Have token?
            if (token) {
                //resolve now
                resolve({token, apiRoot});
            } else {
                //Get token
                //if in WordPress, pass thw WordPress nonce
                const wpNonce = CALDERA_MAILCHIMP.hasOwnProperty('_wpnonce') ? CALDERA_MAILCHIMP._wpnonce : false;
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
                const client = new CalderaMailChimpForms(elements, token, apiRoot);
                client.mountAll();
            }
            if (elementsSurvey.length) {
                const client = new CalderaMailChimpSurveyForms(elementsSurvey, token, apiRoot);
                client.mountAll();
            }
        });
    }
});

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

/**
 * Mount signup form(s) on elements
 *
 * @param elements
 * @param token
 * @param apiRoot
 * @returns {{mountAll(): void, mount: mount}}
 * @constructor
 */
function CalderaMailChimpForms(elements, token, apiRoot) {
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
function CalderaMailChimpSurveyForms(elements, token, apiRoot) {

    return {
        ...CalderaMailChimpForms,
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







