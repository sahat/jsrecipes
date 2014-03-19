'use strict';

angular.module('MyApp')
  .controller('MainCtrl', function($scope, $routeParams) {

    $scope.backend = {
      beginner: [
        {
          title: 'Introduction to Jade',
          slug: 'introduction-to-jade',
          description: 'Brief crash course into Jade templating language'
        },
        {
          title: 'Form submission in Express',
          slug: 'form-submission-in-express',
          description: 'Learn how to POST forms in Express'
        },
        {
          title: 'File Upload',
          slug: 'file-upload',
          description: 'Uploading user files'
        },
        {
          title: 'Useful Node.js utilities',
          slug: 'useful-nodejs-utlities'
        },
        {
          title: 'Socket.IO 101',
          slug: 'socketio-101'
        },
        {
          title: 'Creating a simple MongoDB Schema',
          slug: 'creating-a-simple-mongodb-schema'
        },
        {
          title: 'Logging',
          slug: 'logging'
        },
        {
          title: 'Node.js Debugging',
          slug: 'nodejs-debugging'
        }
      ],
      intermediate: [],
      advanced: []
    };

    var currentPage = _.findWhere($scope.backend.beginner, { slug: $routeParams.name });

    $scope.getTitle = function() {
      return currentPage.title;
    };

    $scope.getDescription = function() {
      return currentPage.description;
    };

    $scope.docUrl = function() {
      return 'docs/' + $routeParams.name + '.md';
    };
  });
