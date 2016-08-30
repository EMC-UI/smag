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
  // ssh to the host listed in the project
  console.log('host: '+ project['ssh-host']);
  console.log('user: '+ project['ssh-user']);
  console.log('pass: '+ project['ssh-pass']);
  var ssh = new SSH({
    host: project['ssh-host'],
    user: project['ssh-user'],
    pass: project['ssh-pass']
  });
  var gotUrl = false;

  var args = "'" + [
      '--server',
      project['vm-vcenter'],
      '--username',
      project['vm-vcenter-user'],
      '--password',
      project['vm-vcenter-pass'],
      '--vm',
      project['vm-name']
  ].join("' '") + "'";

  console.log('args=' + args);

  // run the perl script on the vma host
  ssh.exec('./generateHTML5VMConsole.pl ' + args, {
    out: function(stdout) {
      // we get all the output at once, so split on newline
      stdout.split(/\r?\n/).forEach(function(line) {
        console.log('sshout: ' + line);
        // if we haven't gotten a url from stdout yet, and we get some
        // stdout, send that to the callback
        if (!gotUrl && (line = line.trim()).length > 0) {
          gotUrl = true;
          callback(line, undefined);
          return false;
        }
        return true;
      });
    },
    exit: function(code) {
      // if the ssh exist w/o sending a url, send the callback an error
      console.log('Exited with error code ' + code);
      if (!gotUrl) {
        callback(undefined, 'Exited with error code: ' + code);
      }
    },
    err: function(line) {
      console.log('ssherr: ' + line);
    }
  }).start({
    success: function() {
      console.log('Connected to ' + project['ssh-host']);
    },
    fail: function(err) {
      console.log('Failed to connect to ' + project['ssh-host'] + ': ' + err);
    }
  });

  //console.log('Calling callback with url');
  //callback('http://www.emc.com', undefined);
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
