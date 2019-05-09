/** globals CALDERA_MAILCHIMP */
import domReady from '@wordpress/dom-ready';
import React from 'react';
import ReactDOM from 'react-dom';
import CalderaMailChimpForm from './components/CalderaMailChimpForm'

domReady( function() {
	const elements = document.querySelectorAll('.calderaMailchimp');
	if( elements.length ){
		const client = new CalderaMailChimpForms(elements,CALDERA_MAILCHIMP.token,CALDERA_MAILCHIMP.apiRoot);
		client.mountAll();

	}
} );

function CalderaMailChimpForms(elements,token,apiRoot){

	function createElementId  (element,listId){
		return `${element.offsetTop}-${listId}`;
	}
	function setElementId(element,listId){
		element.id = createElementId(element,listId);
		return element
	};
	return {
		mountAll(){
			if( elements.length ){
				console.log(elements);
				elements.forEach(element => {
					const listId =element.dataset.list;
					this.mount(element,listId);
				})
			}
		},


		mount:  (element,listId) =>{

			//const {Suspense} = React;
			//const CalderaMailChimpForm = React.lazy(() => import('./components/CalderaMailChimpForm'));
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



