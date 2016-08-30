/**
 * Created by monzys on 8/29/2016.
 */
//#!/usr/bin/env node
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var projects = require('./server/projects');
var vcenters = require('./server/vcenters');


module.exports = (function() {

    var port = 5000;

    var init = function() {
        var app = express();
        app.use(express.static('.'));
        app.use(bodyParser.json());

        app.get('/api/projects', function (req, res) {
            res.send(projects.getAll());
        });

        app.get('/api/projects/:id/vmrc', function (req, res) {
            // call the method to gen the vmrc url
            //console.log('calling genVmrc');
            projects.genVmrc(req.params.id, function(url, err) {
              // something happened getting the url
              if (!url) {
                //console.log('sending error: ' + err);
                res.status(500).send(err);
              }
              // got it, so send it to the response
              else {
                //console.log('sending url: ' + url);
                res.send({
                  url: url
                });
              }
            });
        });

        app.get('/api/projects/:id', function (req, res) {
            res.send(projects.get(req.params.id));
        });

        app.get('/api/vcenters', function (req, res) {
            res.send(vcenters.getAll());
        });

        app.get('/api/vcenters/:id', function (req, res) {
            res.send(vcenters.get(req.params.id));
        });

        app.listen(port, function () {
            console.info('The server is listening at port ' + port);
        });

    }

    init();

})();

