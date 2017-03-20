var _ = require('lodash'),
path = require('path'),
fs = require('fs');
var model = {};
fs.readdirSync(__dirname).filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'loader.js')
    }).forEach(function(file) {
        model = _.extend(model, require(path.join(__dirname, file)));                      
    });

module.exports = model;