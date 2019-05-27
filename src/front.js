/** globals CALDERA_MAILCHIMP */
import domReady from '@wordpress/dom-ready';
import React from 'react';
import {LoadAllCalderaMailChimpForms} from "./front/";

window.CALDERA_MAILCHIMP = window.CALDERA_MAILCHIMP || {};

domReady(function () {
    const token = CALDERA_MAILCHIMP.hasOwnProperty('token') ? CALDERA_MAILCHIMP.token : false;
    const apiRoot = CALDERA_MAILCHIMP.apiRoot;
    const wpNonce = CALDERA_MAILCHIMP.hasOwnProperty('_wpnonce') ? CALDERA_MAILCHIMP._wpnonce : false;

    LoadAllCalderaMailChimpForms({token,apiRoot,wpNonce});
});







