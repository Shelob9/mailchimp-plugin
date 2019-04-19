import React, {Component} from 'react';
import logo from "../../logo.svg";
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * The application header
 * @param title
 * @param className
 * @return {*}
 * @constructor
 */
export const Header = ({
						   title,
						   className
					   }) => (
	<header
		className={classNames("App-header", className)}>
		<img src={logo} className="App-logo" alt="logo"/>
		<h1 className="App-title">{title}</h1>
	</header>
);

/**
 * Prop definitions for Header component
 *
 * @type {{title: shim}}
 */
Header.propTypes = {
	title: PropTypes.string,
};

/**
 * Default prop types for header component
 *
 * @type {{title: string}}
 */
Header.defaultProps = {
	title: 'Welcome to Caldera WordPress Plugin'
};


