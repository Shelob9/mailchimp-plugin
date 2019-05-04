import { configure } from '@storybook/react';
import {createElement} from '@wordpress/element';

global.wp =  window.wp || {
	element: {
		createElement,
	}
};

function loadStories() {
	require('glob-loader!./pattern')

}

configure(loadStories, module);
