import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MailChimpForm from './components/MailChimpForm'
import MailChimpSurveyForm from './components/MailChimpSurveyForm'


const fakeQuestionFieldId2 = 'firstQuestion';
const fakeQuestionField2 = {
	"fieldId": fakeQuestionFieldId2,
	"label": "Are you new to JavaScript?",
	"fieldType": "checkbox",
	"value": [],
	"options": [
		{"id": "75091baaad", "value": "75091baaad", "label": "Totally"},
		{"id": "75091baaa1", "value": "75091baad1", "label": "Not At All"},
		{"id": "0a4dc88501", "value": "0a4dc88501", "label": "A Bit"}
	]
};

const fakeQuestionFieldId3 = 'YASsecondQuestion';
const fakeQuestionField3 = {
	"fieldId": fakeQuestionFieldId3,
	"label": "Are you comfortable with any Frameworks?",
	"fieldType": "checkbox",
	"value": [],
	"options": [
		{"id": "15091baaad", "value": "15091baaad", "label": "React"},
		{"id": "15091baad1", "value": "15091baad1", "label": "VueJs"},
		{"id": "1a4dc88501", "value": "1a4dc88501", "label": "AngularJS"}
	]
};

const questions = [fakeQuestionField2, fakeQuestionField3];

const emailField = {
	fieldId: 'mc-email',
	type: 'input',
	html5type: 'email',
	required: true,
	label: 'Email',
}
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

				<div>
					<h2>Basic Form</h2>
					<MailChimpForm form={form} />
				</div>
				<div>
					<h2>Survey Form</h2>
					<MailChimpSurveyForm
						emailField={emailField}
						listId={'cf1'}
						questions={questions}
					/>
				</div>
			</div>
		</div>
	);

}

export default App;
