import React from 'react';
import logo from './logo.svg';
import './App.css';
import CalderaMailChimpForm from './components/CalderaMailChimpForm'
import CalderaMailChimpSurveyForm from './components/CalderaMailChimpSurveyForm'

function App() {
	const showBasicForm = false;
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<h1 className="App-title">Welcome to Caldera WordPress Plugin</h1>
			</header>
			<div>

				<div>
					<h2>Basic Form</h2>
					{
						showBasicForm &&
						<CalderaMailChimpForm
							listId={'45907f0c59'}
							token={'1'}
							apiRoot={'https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/v1/lists'}
						/>
					}
				</div>
				<div>
					<h2>Survey Form</h2>
					<CalderaMailChimpSurveyForm
						listId={'45907f0c59'}
						token={'1'}
						apiRoot={'https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/v1/lists'}
					/>
				</div>
			</div>
		</div>
	);

}

export default App;
