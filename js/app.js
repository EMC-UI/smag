(function (angular) {
    "use strict";
    var app = angular.module("app", []);

    app.controller('controller', ['$scope','$interval', function($scope, $interval) {
        console.log('Got here!: ' + $scope);
    }]);


    app.controller("ProjectListCtrl", ["$scope", "$location", '$http', '$sce',
        function ($scope, $location, $http, $sce) {
            $http.get('/api/projects').
                success(function(projects) {
                    $scope.projects = projects;
                });

            $scope.select = function (project) {
                // Set the project to display
                // TODO:: Need animation
                $scope.selectedProject = project;
                // update the iframe with the url
                $http.get('/api/projects/' + project.id + '/vmrc').
                  then(
                    // success
                    function(body) {
                      if (!body.data.url) {
                        alert('Invalid json: ' + body);
                        $scope.detailFrameSrc = '';
                      }
                      else {
                        console.log('Loading iframe ' + body.data.url);
                        $scope.detailFrameSrc = $sce.trustAsResourceUrl(body.data.url);
                      }
                    },
                    // failure
                    function(error) {
                      alert('URL fetch failed: ' + (error.statusText || ('status=' + error.status)));
                    }
                  );
            };

            $scope.cancel = function(project) {
                //TODO:: Disconnect the project session
                //Hide the frame
                $scope.selectedProject = undefined;
            }
        }
    ]);

}(window.angular));
