# Caldera WordPress Plugin Boilerplate

## Boilerplate Readme

### When To Use This Boilerplate?
This boilerplate is good for WordPress plugins that use [the Caldera Framework](https://github.com/CalderaWP/caldera/) and do not provide blocks.

This boilerplate provides:

* PHP
    - Autoloader and dependency management by composer
    - unit, integration, and acceptance tests with phpunit, run by composer scripts.
* JavaScript
    - React app in a WordPress admin page (sub-menu item of Caldera menu).
    - Unit tests run with Jest.
    - ES6, webpack, babel, JSX, eslint, etc.   

### Creating A Plugin From This
* Make a copy of this.
* Change the directory name and main plugin file name.
* Change the plugin header.
* Change the name of the package in composer.json
* Change the name of the package in package.json
* Find and replace `CalderaMailChimp` your root namespace for PHP classes.
    - If you will be creating `calderawp\CalderaStripeGateway` then you would replace `CalderaMailChimp` with `CalderaStripeGateway`
    - If you are not working for CalderaWP, please change the vendor prefix from `calderawp` to a prefix that is unique to you or your employer.
* Find and replace `ModuleName` with the name that the main module class should have.
* `composer install`
* (optional) Write a bash script or something to automate all of this.

### Creating A Caldera Forms Processor With This Boilerplate
#### For Caldera Forms 1.x Only
See: https://calderaforms.com/doc/creating-caldera-forms-processors/

#### For Caldera Forms 1.x and 2.x
* [Creating a processor is documented here](https://github.com/CalderaWP/caldera/blob/master/docs/extending/form-processors.md)
* This plugin adds a sub page to Caldera Forms admin menu. The UI is a small React app.
* This boilerplate should be used with Caldera Forms 1.8 or later.
    - Caldera Forms 1.8 is currently in development.
    - Use [the develop branch](https://github.com/CalderaWP/Caldera-Forms/tree/develop), also, use The Force Luke.
    
*The rest of the README is for your plugin*

## Install
@TODO

## PHP
PHP code should be in the directory `php` and follow the [PSR-4 Standard](https://www.php-fig.org/psr/psr-4/) for class, filename and directory naming, because we are using the [composer autoloader](https://getcomposer.org/doc/01-basic-usage.md#autoloading).

## Testing
Tests uses phpunit as the test runner, as well as for assertions and [Mockery](http://docs.mockery.io/en/latest/) for mocking.

* Run unit, integration and acceptance tests
    - `composer tests`
    
### Unit Tests 
* Unit tests are located in /tests/Unit
* Run unit tests
    - `composer test:unit`
### Integration Tests
* Integration tests are located in /tests/Integration
* Run integration tests
    - `composer test:integration`
* Run acceptance tests
    - `composer test:acceptance`
* Fix deviations from code style (PSR-1/2 with tabs)
    - `composer fixes`

## JavaScript 
This plugin has a React-powered admin page. The admin app was created using [Human Made's react-wp-scripts](https://github.com/humanmade/react-wp-scripts). It is generally a good idea to switch to using the normal react-scripts.

* The app is in the directory `src`. 
* You should [read these troubleshooting tips](https://github.com/humanmade/react-wp-scripts#troubleshooting).


### Development
* Install
    - `yarn`
* Start the development server
    - `yarn start`
    
When you have the development server running you get a React front-end to preview your UI in that loads real fast with hot module replacement (HMR). And in your wp-admin page you *should* get HMR as well.

#### Testing
We use [Jest](https://jestjs.io) as our test runner.

* Start test watcher
    - `yarn test`


## License, Copyright, etc.
Copyright 2019+ CalderaWP LLC and licensed under the terms of the GNU GPL license. Please share with your neighbor.
