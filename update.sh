#!/usr/bin/env bash
[ ! -e vendor ] && composer install
composer update
[ ! -e node_modules ] && yarn install
yarn update
