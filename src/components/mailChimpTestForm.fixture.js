export const mailChimpTestForm = {
	"ID": "mc-45907f0c59",
	"fields": [{
		"fieldId": "mc-email",
		"fieldType": "input",
		"html5Type": "email",
		"isRequired": true,
		"label": "Email",
		"default": ""
	}, {
		"fieldId": "FNAME",
		"fieldType": "input",
		"html5Type": "text",
		"isRequired": false,
		"label": "First Name",
		"default": ""
	}, {
		"fieldId": "LNAME",
		"fieldType": "input",
		"html5Type": "text",
		"isRequired": false,
		"label": "Last Name",
		"default": ""
	}, {
		"fieldId": "MMERGE3",
		"fieldType": "input",
		"html5Type": "url",
		"isRequired": false,
		"label": "Primary Website",
		"default": ""
	}, {
		"fieldId": "50c908e6aa",
		"label": "What React Framework Do You Want To Learn?",
		"fieldType": "checkboxes",
		"value": [],
		"options": [{"id": "75091baaad", "value": "75091baaad", "label": "Gatsby"}, {
			"id": "0a4dc88500",
			"value": "0a4dc88500",
			"label": "Next.Js"
		}, {"id": "5a44f196ec", "value": "5a44f196ec", "label": "Create React App"}]
	}, {"fieldId": "mc-submit", "fieldType": "submit", "value": "Subscribe"}],
	"rows": [{
		"rowId": "mc-45907f0c59-1",
		"columns": [{"fields": ["mc-email"], "width": "1/2", "columnId": "mc-45907f0c59-1-1"}, {
			"fields": ["FNAME"],
			"width": "1/2",
			"columnId": "mc-45907f0c59-1-2"
		}]
	}, {
		"rowId": "mc-45907f0c59-2",
		"columns": [{"fields": ["LNAME"], "width": "1/2", "columnId": "mc-45907f0c59-2-1"}, {
			"fields": ["MMERGE3"],
			"width": "1/2",
			"columnId": "mc-45907f0c59-2-2"
		}]
	}, {
		"rowId": "mc-45907f0c59-3",
		"columns": [{"fields": ["50c908e6aa"], "width": "1/2", "columnId": "mc-45907f0c59-3-1"}]
	}, {
		"rowId": "mc-45907f0c59-4",
		"columns": [{"fields": ["mc-submit"], "width": "1", "columnId": "mc-45907f0c59-4-2"}]
	}],
	"conditionals": [],
	"processors": [{
		"type": "mc-subscribe",
		"listId": "45907f0c59",
		"emailField": "mc-email",
		"mergeFields": ["FNAME", "LNAME", "MMERGE3"],
		"groupFields": ["50c908e6aa"],
		"submitUrl": "https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/v1/lists/subscribe"
	}]
};
