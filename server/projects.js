'use strict';

var _ = require('underscore');
var fs = require('fs');
var SSH = require('simple-ssh');

var projects = JSON.parse(fs.readFileSync('./server/projects.json', 'utf8'));
console.log('projects:');
console.log(projects);

function getVmrcURL(project) {
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

  return 'http://www.emc.com';
}

function getAllProjects() {
  return _.sortBy(projects, function (c) {
    return c.name;
      return c.description;
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

    getVmrc: function(id) {
      var proj = getProject(id);
      if (!proj) {
        throw 'Unknown project ' + id;
      }
      return { 
        url: getVmrcURL(proj)
      }
    }
};
