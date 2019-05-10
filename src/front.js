/** globals CALDERA_MAILCHIMP */
import domReady from '@wordpress/dom-ready';
import React from 'react';
import ReactDOM from 'react-dom';
import CalderaMailChimpForm from './components/CalderaMailChimpForm'
import {blockClassNameIdentifiers} from "./blocks/blockClassNameIdentifiers";
import CalderaMailChimpSurveyForm from "./components/CalderaMailChimpSurveyForm";

domReady( function() {
	const {signup,survey} = blockClassNameIdentifiers;
	const elements = document.querySelectorAll(`.${signup}`);
	const elementsSurvey =  document.querySelectorAll(`.${survey}`);

	if( elements.length ){
		const client = new CalderaMailChimpForms(elements,CALDERA_MAILCHIMP.token,CALDERA_MAILCHIMP.apiRoot);
		client.mountAll();

	}
	if( elementsSurvey.length ){
		const client = new CalderaMailChimpSurveyForms(elementsSurvey,CALDERA_MAILCHIMP.token,CALDERA_MAILCHIMP.apiRoot);
		client.mountAll();

	}
} );

function createElementId  (element,listId){
	return `${element.offsetTop}-${listId}`;
}
function setElementId(element,listId){
	element.id = createElementId(element,listId);
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
function CalderaMailChimpForms(elements,token,apiRoot){
	return {
		mountAll(){
			if( elements.length ){
				elements.forEach(element => {
					const listId = element.dataset.list;
					this.mount(element,listId);
				})
			}
		},
		mount:  (element,listId) =>{
			setElementId(element,listId);
			function createComponent() {
				return React.createElement('div',
					{
						fallback: React.createElement('div', {}, 'Loading'),
					},
					[
						React.createElement(CalderaMailChimpForm, {listId, token,apiRoot,key:createElementId(element,listId)})
					]
				)
			}

			const App = createComponent();

			ReactDOM.render(App,document.getElementById(createElementId(element,listId)));

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
function CalderaMailChimpSurveyForms(elements,token,apiRoot){

	return {
		...CalderaMailChimpForms,
		mount:  (element,listId) =>{
			setElementId(element,listId);
			function createComponent() {
				return React.createElement('div',
					{
						fallback: React.createElement('div', {}, 'Loading'),
					},
					[
						React.createElement(CalderaMailChimpSurveyForm, {listId, token,apiRoot,key:createElementId(element,listId)})
					]
				)
			}

			const App = createComponent();

			ReactDOM.render(App,document.getElementById(createElementId(element,listId)));

		}
	}
}







