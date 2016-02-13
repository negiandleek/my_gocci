'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const api = require('./routes/api.js');
const app = express();

const baseApiUrl = '/mygocci/api';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static((__dirname , 'dist')));

//routing
// app.all('*',(req,res,next) => {
//     res.contentType('json'); //contentTypeについて学ぶ
//     res.header( 'Access-Control-Allow-Origin', '*' );
//     next();
// });

// app.get('/',(req,res,next) => {
//     res.send('ok');
// })

// app.get('/mygocci/api/get/photo', (req,res,next) => {
//     next();
// });


//middleware
// app.use(baseApiUrl,api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(1234,() => {
    console.log('serve running...');
});

module.exports = app;
