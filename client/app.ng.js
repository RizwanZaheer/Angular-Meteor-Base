var App = angular.module('App', [
  'angular-meteor',
  'ui.router',
  'ngMaterial',
  'accounts.ui'
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
            if(!_.contains(user.roles, 'adminn')) {
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
    $rootScope.subscribe('users')
    $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error) {
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    }
  );
}

);

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
function ($scope, $mdDialog, $meteor, $reactive, $mdToast) {
  $scope.subscribe('posts');
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
