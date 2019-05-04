import {createElement} from '@wordpress/element';
import 'babel-polyfill'; //prevents ReferenceError: regeneratorRuntime is not defined when using WordPress components
import { configure } from 'enzyme';

/**
 * WordPress globals
 * 
 * @type {*|{element: {createElement: *}}}
 */
global.wp =  window.wp || {
	element: {
		createElement,
	}
};


/**
 * Setup Enzyme
 */
const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });
