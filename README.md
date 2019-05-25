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

## Usage
### WordPress Plugin

* Filter which fields/ interest groups are shown
```php
add_filter('calderawp/Mailchimp/fieldsToHide', function ($fieldsToHide) {
        $fields =  [
            "FNAME" => false,
            "LNAME" => true,
            "ADDRESS" => true,
            "BIRTHDAY" => true,
            "WEBSITE" => false,
            "TIER" => true,
            "a9c6b55e31" => true,
            "0bba7d9ced" => true,
            "17d4a7a745" => false,
            "5891abdae4" => false
        ];

        return array_filter($fields, function($value){
            return (bool) $value;
        });
    });

```

### JavaScript Client

#### In React App
* Install
    - `yarn add @calderajs/caldera-mailchimp`

#### Without Import

```html
    <script src="https://cdn.jsdelivr.net/gh/Shelob9/mailchimp-plugin/client.js"></script>
    <script>
        window.CALDERA_MAILCHIMP = {
                'token': '12345', //CSFR token
                'apiRoot': 'https://formcalderas.lndo.site/wp-json/caldera-api/v1/messages/mailchimp/'
            }
    </script>
    
```

## Development
### Code Locations
PHP code should be in the directory `php` and follow the [PSR-4 Standard](https://www.php-fig.org/psr/psr-4/) for class, filename and directory naming, because we are using the [composer autoloader](https://getcomposer.org/doc/01-basic-usage.md#autoloading).

JavaScript should go in `src`.


### PHP Testing
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
    
   
### JavaScript  Development
* Start webpack development server
    - `yarn start`

WordPress will automatically detect and load the script from the dev server based on the presence of the `asset-manifest.json` the dev server outputs into the build directory. Hot reloading is only provided while the dev server is running.

You likely will see errors in the console caused by being unable to connect to webpack dev server. You need to visit the [dev server](https://localhost:3030/build/) in the browser and instruct it to trust the self-signed certificate.


#### JavaScript Tests
* Start webpack development server
    - `yarn start`
    - WordPress will automatically detect and load the script from the dev server based on the presence of the `asset-manifest.json` the dev server outputs into the build directory. Hot reloading is only provided while the dev server is running.
* Build for production
    - `yarn build`
* Run Jest test watcher
    - `yarn test`
* Start storybook
    - `yarn storybook` 
    
## Build For Release
* Create WordPress plugin:
    - `yarn zip`
* Generate client for non-WordPress sites
    - `yarn client:create`

## License

This plugin is free software, licensed under the terms of the [GNU General Public License](LICENSE.md#gnu-general-public-license) as published by the Free Software Foundation, version 2. Please share with your neighbors.
