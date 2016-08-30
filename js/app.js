(function (angular) {
    "use strict";
    var app = angular.module("app", []);

    app.controller('controller', ['$scope','$interval', function($scope, $interval) {
        console.log('Got here!: ' + $scope);
    }]);


    app.controller("ProjectListCtrl", ["$scope", "$location", '$http',
        function ($scope, $location, $http) {
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
            }
        }
    ]);

}(window.angular));
