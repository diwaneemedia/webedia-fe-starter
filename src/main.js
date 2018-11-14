// ----- Main app file
const $ = require('jquery');

window.$ = $;
window.jQuery = $;
window.app = {};

// ----- Require modules here
import { hrl, stats, WB } from './js/common/common.js';

// ----- Path to main SCSS file
// const css = require('./scss/style.scss');
import * as css from './scss/style.scss';

window.WB = WB;
window.stats = stats;

// ----- Call modules here
$(document).ready(function() {
    hrl();
});
