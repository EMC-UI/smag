/**
 * Created by monzys on 8/29/2016.
 */
//#!/usr/bin/env node
'use strict';

var express = require('express');
var restClient = require('request-promise');


module.exports = (function() {

    var port = 5000;

    var init = function() {
        var app = express();
        app.use(express.static('.'));

        //app.post('/auth', handleAuth)
        //app.get('/tweets', getTweets)

        console.log(`listening on ${port}`);
        app.listen(port);
    }

    init();

})();

