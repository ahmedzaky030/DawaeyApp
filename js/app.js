// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angular.filter', 'starter.controllers', 'starter.services', 'ionic.cloud', 'ngCordova'])


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
      .state('app.interactions', {
        url: '/interactions',
        views: {
          'menuContent': {
            templateUrl: 'templates/interactions.html',
            controller: 'InteractionsCtrl'
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
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.hide();
      }

      /**Start Wrapping plugins to work on mobile not browser**/
      if (window.cordova) {
        /**Start Google Analytics**/
        if (typeof analytics !== undefined) {
          analytics.startTrackerWithId("UA-88642709-1");
          console.log(analytics);
        } else {
          console.log("Google Analytics Unavailable");
        }
        /**End Google Analytics**/

        /**Start Admob ads**/
        var admobid = {};
        // select the right Ad Id according to platform
        if (/(android)/i.test(navigator.userAgent)) {
          admobid = { // for Android
            banner: 'ca-app-pub-4457719262099261/7851493231',
            interstitial: 'ca-app-pub-4457719262099261/9328226434'
          };
        } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
          admobid = { // for iOS
            banner: 'ca-app-pub-4457719262099261/6235159235',
            interstitial: 'ca-app-pub-4457719262099261/7711892432'
          };
        } else {
          admobid = { // for Windows Phone
            banner: 'ca-app-pub-4457719262099261/7851493231',
            interstitial: 'ca-app-pub-4457719262099261/9328226434'
          };
        }

        if (AdMob) AdMob.createBanner({
          adId: admobid.banner,
          position: AdMob.AD_POSITION.BOTTOM_CENTER,
          autoShow: false
        });
        if (AdMob) AdMob.prepareInterstitial({
          adId: admobid.interstitial,
          autoShow: false
        });
        /**End Admob ads**/
      }
      /**End Wrapping plugins to work on mobile not browser**/
    });
  });
