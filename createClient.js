const fs = require('fs');
const path = require('path');

const source = fs.createReadStream(path.resolve(__dirname, './build/front.js'));
const destination = fs.createWriteStream(path.resolve(__dirname, 'client.js'));

source.pipe(destination);
source.on('end', function () {
    console.log('Client generated');
});
source.on('error',  err => {
    console.log(err);
});


