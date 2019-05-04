export const surveyQuestion1Id = 'fakeGroup2';
export const surveyQuestion1 = {
	"fieldId": surveyQuestion1Id,
	"label": "Are you new to JavaScript",
	"fieldType": "checkbox",
	"value": [],
	"options": [
		{"id": "75091baaad", "value": "75091baaad", "label": "Totally"},
		{"id": "75091baaa1", "value": "75091baad1", "label": "Not At All"},
		{"id": "0a4dc88501", "value": "0a4dc88501", "label": "A Bit"}
	]
};

export const surveyQuestionId2 = 'fakeGroup3';
export const surveryQuestion2 = {
	"fieldId": surveyQuestionId2,
	"label": "Are you comfortable with any JvaScr",
	"fieldType": "checkbox",
	"value": [],
	"options": [
		{"id": "15091baaad", "value": "15091baaad", "label": "React"},
		{"id": "15091baad1", "value": "15091baad1", "label": "VueJs"},
		{"id": "1a4dc88501", "value": "1a4dc88501", "label": "AngularJS"}
	]
};

export const surveyQuestionFields = [surveyQuestion1, surveryQuestion2];

export const surveyEmailField = {
	type: 'input',
	html5type: 'email',
	required: true,
	label: 'Email',
};
