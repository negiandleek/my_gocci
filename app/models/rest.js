'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://localhost/my_gocci_test_db');
connection.on('error',console.error.bind(console, 'connection error:'));

const RestSchema = new Schema({
    rest_name: String,
    location: String
});

RestSchema.plugin(autoIncrement.plugin,{model:'Rest',startAt:0});
let Rest = connection.model('Rest',RestSchema);
module.exports = Rest;