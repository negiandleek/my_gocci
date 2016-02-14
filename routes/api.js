'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://localhost/my_gocci_test_db');
connection.on('error',console.error.bind(console, 'connection error:'));
autoIncrement.initialize(connection);

//modle
let User = require('../app/models/user.js');
let Rest = require('../app/models/rest.js');
let Post = require('../app/models/post.js');

router.all('/*', (req,res,next) => {
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

router.route('/insert')
    .get((req,res)=>{
        for(let i = 0; i < 7; i++){
            let post = new Post({
                post_user_id: data[i].post_user_id,
                post_rest_id: data[i].post_rest_id,
                movie: data[i].movie,
            },{collection: 'posts'});
            post.save();
            res.send();
        }
    });


router.get('/get/chat',(req,res) => {
    res.json();
});

module.exports = router;