const mongo = require('mongoose');

const portfolio = mongo.Schema({
    name: String,
    detail: String
}, { collection: 'Portfolio', versionKey: false });

module.exports = mongo.model('Portfolio', portfolio);