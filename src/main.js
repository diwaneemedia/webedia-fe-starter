// ----- Main app file
const $ = require('jquery');
window.$ = require('jquery');
window.app = {};

// ----- Path to main SCSS file
const css = require('./scss/style.scss');

// ----- Require modules here
const testLog = require('./js/test/test.js');

// ----- Call modules here
$(document).ready(function() {
    testLog();
});
