# 

## Install

### Requires
* Composer
* Yarn
* git
* Node.js
* PHP 7.2+

### Install for development
* ` git clone ...`
* `cd caldera-mailchimp`
* `bash install.sh`


## PHP
PHP code should be in the directory `php` and follow the [PSR-4 Standard](https://www.php-fig.org/psr/psr-4/) for class, filename and directory naming, because we are using the [composer autoloader](https://getcomposer.org/doc/01-basic-usage.md#autoloading).

## Install
`composer install`

### Testing
Tests uses phpunit as the test runner, as well as for assertions and [Mockery](http://docs.mockery.io/en/latest/) for mocking.

* Run all php tests
    - `composer tests`
* Unit tests are located in /tests/Unit
* Run unit tests
    - `composer test:unit`
* Integration tests are located in /tests/Integration
* Run integration tests
    - `composer test:integration`
* Run acceptance tests
    - `composer test:acceptance`
* Fix deviations from code style (PSR-1/2 with tabs)
    - `composer fixes`
    
    

## JavaScript 
### Install

Install: `yarn install`

### Tests
* Start webpack development server
    - `yarn start`
    - WordPress will automatically detect and load the script from the dev server based on the presence of the `asset-manifest.json` the dev server outputs into the build directory. Hot reloading is only provided while the dev server is running.
* Build for production
    - `yarn build`
* Run Jest test watcher
    - `yarn test`
* Start storybook
    - `yarn storybook` 

## License

This plugin is free software, licensed under the terms of the [GNU General Public License](LICENSE.md#gnu-general-public-license) as published by the Free Software Foundation, version 2. Please share with your neighbors.
