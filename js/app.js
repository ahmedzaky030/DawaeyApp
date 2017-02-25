// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angular.filter', 'starter.controllers', 'starter.services', 'ionic.cloud','ngCordova'])


.config(function($stateProvider, $urlRouterProvider, $ionicCloudProvider) {
    $stateProvider

      .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.intro', {
        url: '/intro',
        views: {
          'menuContent': {
            templateUrl: 'templates/intro.html',
            controller: 'IntroCtrl'
          }
        }
      })
      .state('app.main', {
        url: '/main',
        views: {
          'menuContent': {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('app.drug', {
        url: '/drug/:drugId',
        views: {
          'menuContent': {
            templateUrl: 'templates/drug.html',
            controller: 'DrugCtrl'
          }
        }
      })
      .state('app.approximate', {
        url: '/approximate',
        views: {
          'menuContent': {
            templateUrl: 'templates/approximate.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('app.partners', {
        url: '/partners',
        views: {
          'menuContent': {
            templateUrl: 'templates/partners.html',
            controller: 'PartenersCtrl'
          }
        }
      })
      .state('app.sponsors', {
        url: '/sponsors',
        views: {
          'menuContent': {
            templateUrl: 'templates/sponsors.html',
            controller: 'SponsorsCtrl'
          }
        }
      })
      .state('app.developer', {
        url: '/developer',
        views: {
          'menuContent': {
            templateUrl: 'templates/developer.html',
            controller: 'DeveloperCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    if (localStorage.visitedIntro) {
      $urlRouterProvider.otherwise('/app/main');

    } else {
      $urlRouterProvider.otherwise('/app/intro');
    }
    $ionicCloudProvider.init({
      'core': {
        'app_id': '8600d6dc'
      },
      'push': {
        'sender_id': '1061030166084',
        'pluginConfig': {
          'ios': {
            'badge': true,
            'sound': true
          },
          'android': {
            'iconColor': '#FF9900'
          }
        }
      }
    });

  })
  .run(function($rootScope, $ionicPlatform, $ionicHistory) {
    $ionicPlatform.registerBackButtonAction(function(e) {
      if ($rootScope.backButtonPressedOnceToExit) {
        ionic.Platform.exitApp();
      } else if ($ionicHistory.backView()) {
        $ionicHistory.goBack();
      } else {
        $rootScope.backButtonPressedOnceToExit = true;
        window.plugins.toast.showShortCenter(
          "Press back button again to exit",
          function(a) {},
          function(b) {}
        );
        setTimeout(function() {
          $rootScope.backButtonPressedOnceToExit = false;
        }, 2000);
      }
      e.preventDefault();
      return false;
    }, 101);

    $ionicPlatform.ready(function() {
      //Google analytics
      if (typeof analytics !== 'undefined') {
        $cordovaGoogleAnalytics.startTrackerWithId('UA-88642709-1');
      }
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }

      if (window.StatusBar) {
        // hide the status bar using the StatusBar plugin
        StatusBar.hide();
      }
    });
  });
