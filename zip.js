//const ncp = require('ncp').ncp;
//const zipFolder = require('zip-folder');

/**
 * Creates a ZIP file of the plugin
 *
 * @see https://www.npmjs.com/package/archiver#quick-start
 */
const fs = require('fs-extra')
const path = require('path');

const source = __dirname;
const destination = path.join(__dirname, '/caldera-mailchimp');
var archiver = require('archiver');

// create a file to stream archive data to.
var output = fs.createWriteStream(__dirname + '/caldera-mailchimp.zip');
var archive = archiver('zip', {
    zlib: {level: 9} // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('Zip file created');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function () {
    console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        // log warning
    } else {
        // throw error
        throw err;
    }
});

// good practice to catch this error explicitly
archive.on('error', function (err) {
    throw err;
});

// pipe archive data to the file
archive.pipe(output);


// Add files
[
    'caldera-mailchimp.php',
    'LICENSE',
    'README.md',
    'REST-API.md',
    'client.js'
].forEach(name => {
    archive.file(name, {name});

});

// Add directories
[
    'build/',
    'php/',
    'inc/',
    'vendor'
].forEach(directory => {
    archive.directory(directory, directory);
});


// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();
