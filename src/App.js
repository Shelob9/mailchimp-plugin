import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MailChimpForm from './components/MailChimpForm'
import MailChimpSurveyForm from './components/MailChimpSurveyForm'

function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [form, setForm] = useState({});
	useEffect(() => {
		fetch('https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/v1/lists/45907f0c59/form?token=1')
			.then(r => r.json())
			.then(r => {
				setForm(r);
				setIsLoaded(true);
			});

	}, [isLoaded, setIsLoaded]);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<h1 className="App-title">Welcome to Caldera WordPress Plugin</h1>
			</header>
			<div>

				<MailChimpForm
					form={form}
				/>

				<MailChimpSurveyForm/>

			</div>
		</div>
	);

}

export default App;
