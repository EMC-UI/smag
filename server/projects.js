'use strict';

var _ = require('underscore');
var fs = require('fs');
var SSH = require('simple-ssh');

var projects = JSON.parse(fs.readFileSync('./server/projects.json', 'utf8'));
console.log('projects:');
console.log(projects);

// @param project the project (form projects.json)
// @param callback a function(url, err) to call when fetched
function getVmrcURL(project, callback) {
//            var sshExecCommand = function(project) {
//                var ssh = new SSH({
//                    host: 'localhost', //vma-avi.devlsvl.com
//                    user: 'username', // vi-admin
//                    pass: 'password' // ?Strong1?
//                });
//
//                ssh.exec('echo $PATH', {
//                    out: function(stdout) {
//                        console.log(stdout);
//                    }
//                }).start();
//            };

  //console.log('Calling callback with url');
  callback('http://www.emc.com', undefined);
}

function getAllProjects() {
  return _.sortBy(projects, function (c) {
    return c.name;
  });
}

function getProject(id) {
  id = +id;
  return _.find(projects, function (p) {
    return p.id === id;
  });
}

module.exports = {
    getAll: getAllProjects,

    get: getProject,

    // @param id the project id
    // @param callback a function(url, err) to call when fetched
    genVmrc: function(id, callback) {
      var proj = getProject(id);
      if (!proj) {
        //console.log('Calling callback with bad project');
        callback(undefined, 'Unknown project ' + id);
      }
      else {
        getVmrcURL(proj, callback);
      }
    }
};
