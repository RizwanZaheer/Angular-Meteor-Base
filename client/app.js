var App = angular.module('App', [
  'angular-meteor',
  'ui.router',
  'ngMaterial'
]);

App.config([
  '$mdIconProvider',
  '$locationProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($mdIconProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

    $mdIconProvider.iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg");
    $mdIconProvider.iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg");
    $mdIconProvider.iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg");
    $mdIconProvider.iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg");
    $mdIconProvider.iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg");
    $mdIconProvider.iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg");
    $mdIconProvider.iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

    // ui router
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'client/views/home.html',
          controller: 'HomeCtrl'
      })
      .state('blog', {
        url: '/blog',
        templateUrl: 'client/views/blog.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'client/views/contact.html'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'client/views/projects.html'
      });
  }
]);


App.controller('HomeCtrl', ['$scope', '$mdDialog', '$meteor', '$reactive','$mdToast',
function ($scope, $mdDialog, $meteor, $reactive, $mdToast) {
    $reactive(this).attach($scope);
    $scope.subscribe('posts');
    $scope.helpers({
        posts: function () {
            return Collections.Posts.find({});
        }
    });

    $scope.showNewPostDialog = function (ev) {
        $mdDialog.show({
            targetEvent : ev,
            controller: 'NewPostCtrl',
            templateUrl: 'client/views/new-post-dialog.html',
        })
        .then(function (postId) {

            if (postId) {
                $mdToast.show($mdToast.simple().textContent('Post created!'));
            }

        }, function () {
            debugger;
            $scope.status = 'You cancelled the dialog.';
        });
    }
}]);

App.controller('NewPostCtrl', ['$scope','$mdDialog','$meteor','$reactive',
function ($scope, $mdDialog, $meteor, $reactive) {
    $reactive(this).attach($scope);

    $scope.post = {};

    $scope.helpers({
        posts: function () {
            return Collections.Posts.find({});
        }
    });

    $scope.insertPost = function () {
        var newPostId = Collections.Posts.insert($scope.post);
        $scope.post = {};
        $mdDialog.hide(newPostId);
    }

    $scope.closeDialog = function () {
        $mdDialog.hide();
    }
}
])
