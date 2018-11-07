const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: path.resolve(__dirname, '../html'),
    cssOutput: 'css/styles.css',
    jsOutput: 'js/master.bundle.js'
};