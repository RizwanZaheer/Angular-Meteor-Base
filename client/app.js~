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
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'client/views/home.ng.html'
      })
      .state('blog', {
        url: '/blog',
        templateUrl: 'client/views/blog.ng.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'client/views/contact.ng.html'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'client/views/projects.ng.html'
      });
  }
]);