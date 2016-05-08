var App = angular.module('App', [
  'angular-meteor',
  'ui.router',
  'ngMaterial',
  'accounts.ui',
  'ngStorage',
  'gridster',
  'ngAnimate'
]);

App.config(
  function ($mdIconProvider, $locationProvider, $stateProvider, $urlRouterProvider, $mdIconProvider) {

    $mdIconProvider.iconSet("alert", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-alert.svg");
    $mdIconProvider.iconSet("av", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg");
    $mdIconProvider.iconSet("device", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-device.svg");
    $mdIconProvider.iconSet("editor", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg");
    $mdIconProvider.iconSet("file", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-file.svg");
    $mdIconProvider.iconSet("hardware", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-hardware.svg")
    $mdIconProvider.iconSet("maps", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-maps.svg")
    $mdIconProvider.iconSet("notification", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-notification.svg")
    $mdIconProvider.iconSet("hardware", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-hardware.svg")
    $mdIconProvider.iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg");
    $mdIconProvider.iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg");
    $mdIconProvider.iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg");
    $mdIconProvider.iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg");
    $mdIconProvider.iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg");
    $mdIconProvider.iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg");
    $mdIconProvider.iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg")

    // ui router
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'client/views/home.html',
      controller: 'HomeCtrl'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'client/views/admin.html',
      controller: 'AdminCtrl',
      resolve: {
        currentUser($meteor, $q) {
          return $meteor.requireUser().then(function(user) {
            if(!_.contains(user.roles, 'admin')) {
              // fail the promise chain
              return $q.reject('FORBIDDEN');
            }
            // keep the success promise chain
            return user;
          });
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'client/views/login.html'
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'client/views/forbidden.html'
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
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'client/views/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        currentUser: function($q) {
          if (Meteor.userId() === null) {
            return $q.reject('AUTH_REQUIRED');
          } else {
            return $q.resolve();
          }
        }
      }
    });
  }
);

App.run(
  function($rootScope, $state) {
    $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error) {
      switch (error) {
        case 'FORBIDDEN':
        $state.go('forbidden');
        break;
        case 'AUTH_REQUIRED':
        $state.go('login');
        break;
        default:

      }

    }
  );
}

);
App.controller('ProfileCtrl', function ($scope, $localStorage) {
  $scope.$storage = $localStorage;
})

App.controller('AdminCtrl', function($scope) {
  $scope.subscribe('application');

  $scope.submitApplicationForm = function() {
    if($scope.applicationForm.$valid) {
      Collections.Applications.update({_id: $scope.application._id },
        {$set: $scope.application})
      }
    }

    $scope.helpers({
      application() {
        return Collections.Applications.findOne({});
      }
    })

  });
  App.controller('HomeCtrl',
  function ($scope, $mdDialog, $meteor, $reactive, $mdToast,$timeout) {

    $timeout(function () {

      var resizeElement = document.getElementById('content'),
      resizeCallback = function() {
        /* do something */
        $scope.gridsterOpts.rowHeight= ($('#content').outerHeight()-10)/3;
      };
      addResizeListener(resizeElement, resizeCallback)
    },0);

    $scope.gridsterOpts = {
      columns: 6,
      rows:3,
      isMobile: false, // stacks the grid items if true
      mobileModeEnabled: false,
      outerMargin: false,
      resizable: {
        enabled: true
      },
      draggable: {
        enabled: true
      }
    };
    $scope.customItems = [
      { size: { x: 2, y: 1 }, position: [0, 0] },
      { size: { x: 2, y: 2 }, position: [0, 2] },
      { size: { x: 1, y: 1 }, position: [0, 4] },
      { size: { x: 1, y: 1 }, position: [0, 5] },
      { size: { x: 2, y: 1 }, position: [1, 0] },
      { size: { x: 1, y: 1 }, position: [1, 4] },
      { size: { x: 1, y: 2 }, position: [1, 5] },
      { size: { x: 1, y: 1 }, position: [2, 0] },
      { size: { x: 2, y: 1 }, position: [2, 1] },
      { size: { x: 1, y: 1 }, position: [2, 3] },
      { size: { x: 1, y: 1 }, position: [2, 4] }
    ];

    $scope.helpers({
      posts: function () {
        return Collections.Posts.find({});
      }
    });

    $scope.showNewPostDialog = function (ev) {
      $mdDialog.show({
        targetEvent: ev,
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
  });

  App.controller('NewPostCtrl',
  function ($scope, $mdDialog, $meteor, $reactive) {
    $reactive(this).attach($scope);

    $scope.post = {};

    $scope.helpers({
      posts: function () {
        return Collections.Posts.find({});
      }
    });

    $scope.insertPost = function () {
      if ($scope.postForm.$valid) {
        var newPostId = Collections.Posts.insert($scope.post);
        $scope.post = {};
        $mdDialog.hide(newPostId);
      }

    }

    $scope.closeDialog = function () {
      $mdDialog.hide();
    }
  }
);


App.controller('MainCtrl', function ($scope, $mdMedia, $mdSidenav) {
  $scope.$mdMedia = $mdMedia;
  $scope.$mdSidenav = $mdSidenav;

})
