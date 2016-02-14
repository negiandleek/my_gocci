'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://localhost/my_gocci_test_db');
connection.on('error',console.error.bind(console, 'connection error:'));

const PostSchema = new Schema({
    post_user_id: Number,
    post_rest_id: Number,
    movie: String,
    data: {type: Date, default: Date.now}
});

PostSchema.plugin(autoIncrement.plugin,{model:'Post',startAt:0});
let Post = connection.model('Post',PostSchema);
module.exports = Post;