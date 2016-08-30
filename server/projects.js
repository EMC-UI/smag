'use strict';

var _ = require('underscore');
var SSH = require('simple-ssh');

var projects = [
  {
      "id": 1,
      "name": "McQueen",
      "vm-name": "IAAS (71a5a82e-c2e9-4cdf-8daf-5ea40f8e3cd7)",
      "vm-vcenter": "vcenter-dev2.devlsvl.com",
      "vm-vcenter-user": "root",
      "vm-vcenter-pass": "vmware7!"
  },
  {
      "id": 2,
      "name": "MSM",
      "hostId": 1
  }
];

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
