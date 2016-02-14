'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://localhost/my_gocci_test_db');
connection.on('error',console.error.bind(console, 'connection error:'));

const UserSchema = new Schema({
    id_name: String,
    user_name: String
});

UserSchema.plugin(autoIncrement.plugin,{model:'User',startAt:0});
let User = connection.model('User',UserSchema);
module.exports = User;
