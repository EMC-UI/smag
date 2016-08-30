(function (angular) {
    "use strict";
    var app = angular.module("app", []);
//    var SSH = require('simple-ssh');

    app.controller('controller', ['$scope','$interval', function($scope, $interval) {
        console.log('Got here!: ' + $scope);
    }]);


    app.controller("ProjectListCtrl", ["$scope", "$location", '$http', function ($scope, $location, $http) {
            $http.get('/api/projects').
                success(function(projects) {
                    $scope.projects = projects;
                });

            $scope.select = function (project) {
                // TODO:: Generate the URL and update the scope
                //$scope.detailFrameSrc = '';
                // Set the project to display
                // TODO:: Need animation
                $scope.selectedProject = project;
            };

            $scope.cancel = function(project) {
                //TODO:: Disconnect the project session
                //Hide the frame
                $scope.selectedProject = undefined;
            };
//
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

        }]);

}(window.angular));
