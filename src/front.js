import domReady from '@wordpress/dom-ready';

domReady( function() {
	const elements = document.querySelectorAll('.calderaMailchimp');
	if( elements.length ){
		console.log(elements);
		elements.forEach(element => {
			console.log(element.dataset.list);
		})
	}
} );

function calderaMailChimpForms(){

}



function init(){
	const React = require( 'react');
	const {Suspense} = React;
	const CalderaMailChimpForm = React.lazy(() => import('./components/CalderaMailChimpForm'));

	function MyComponent({listId,apiRoot,token}) {
		return (
			<div>
				<Suspense fallback={<div>Loading...</div>}>
					<CalderaMailChimpForm listId={listId} apiRoot={apiRoot} token={token} />
				</Suspense>
			</div>
		);
	}

}

