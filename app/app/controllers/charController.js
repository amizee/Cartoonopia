const charInstance = require('../models/character');
const asyncHandler = require('express-async-handler');

module.exports.getIndex = function(req, res) {
    res.render('../views/index.ejs');
}
module.exports.getAllChar = function(req, res) {
    res.render('allchar.ejs');
}
module.exports.getNewChar = function(req, res) {
    res.render('newchar.ejs');
}

/* Create Character */

/* Edit Character */

/* Delete Character */