angular.module('starter.controllers', [])
  .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $interval, $timeout, $ionicHistory) {
    $scope.startApp = function() {
      $state.go('app.main');
      //storage that user has visted intro once
      localStorage.visitedIntro = true
    };



    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };




    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    //type effect
    var content = 'أهلاً بكم في تطبيق دوائي .. التطبيق رقم واحد لبحث الأدوية .. والذي يتيح لك العديد من خيارات البحث عن الدواء ... سنأخذك في جوله كيف تتعامل مع التطبيق';

    $scope.type = "";
    var i = 0;

    var timer = $interval(function() {
      if (i < content.length)
        $scope.type += content[i];
      else {
        $interval.cancel(timer);
        // console.log('cancelling');
      }

      i++;
      $scope.safeApply();
    }, 100);
  })
  .controller('MainCtrl', function($scope, $state, $filter, $stateParams, $http, $ionicPlatform, $ionicLoading, DrugService, $ionicPush, $cordovaGoogleAnalytics) {
    //Start here
    $scope.drugs = [];
    $scope.numberOfItemsToDisplay = 10; // Use it with limit to in ng-repeat
    //http service
    var drugTradeNames = []
    DrugService.GetDrug().then(function(drugs) {
      // drugs = drugs;
      $scope.drugs = drugs;
    });

    //lazy load items
    $scope.addMoreItem = function(done) {
      if ($scope.drugs.length > $scope.numberOfItemsToDisplay)
        $scope.numberOfItemsToDisplay += 10; // load number of more items
      $scope.$broadcast('scroll.infiniteScrollComplete')
    };

    $scope.search = {};
    $scope.filterByVar = "tradename";
    //change filter value
    $scope.showSelectValue = function(mySelect) {
      // console.log(mySelect);
      if (mySelect == "trade") {
        $scope.filterByVar = "tradename"
      } else if (mySelect == "activeingredient") {
        $scope.filterByVar = "activeingredient"
      } else if (mySelect == "price") {
        $scope.filterByVar = "price"
      } else if (mySelect == "company") {
        $scope.filterByVar = "company"
      } else if (mySelect == "approximate") {
        $scope.filterByVar = "tradename"
        $state.go('app.approximate');
      }
    }
    //push notification
    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      // console.log('Token saved:', t.token);
    });
    $scope.$on('cloud:push:notification', function(event, data) {
      var msg = data.message;
      alert(msg.title + ': ' + msg.text);
    });

    /**Start Google Analytics**/
    $ionicPlatform.ready(function() {
      if (window.cordova) {
        if (typeof analytics !== undefined) {
          analytics.trackView("Main Screen");
        }
      }
    });
    /**End Google Analytics**/
    // No ads in the main ?
    /**Hide Admob ads**/
    if (window.cordova) {
      if (window.AdMob) AdMob.hideBanner();
    }
    /**End Hide Admob ads**/


  })
  .controller('MenuCtrl', function($scope, $state) {})
  .controller('AppCtrl', function($scope, $state) {})
  .controller('DrugCtrl', function($scope, $state, $ionicLoading, $ionicPlatform, DrugService, $stateParams) {
    var id = $stateParams.drugId;
    $scope.drug = {};
    $scope.similars = [];
    var thisDrugAI = "";
    DrugService.GetDrug().then(function(drugs) {
      for (var i = 0; i < drugs.length; i++) {
        if (drugs[i].id == id) {
          $scope.drug = drugs[i];
          thisDrugAI = drugs[i].activeingredient;
        }
      }
      for (var i = 0; i < drugs.length; i++) {
        if (drugs[i].activeingredient === thisDrugAI) {
          var obj = {
            id: drugs[i].id,
            tradename: drugs[i].tradename
          }
          $scope.similars.push(obj)
        }
      }

      /**Start Google Analytics**/
      if (window.cordova) {
        if (typeof analytics !== undefined) {
          analytics.trackView($scope.drug.tradename);
        }
      }
      /**End Google Analytics**/
    });


    /**Display Admob ads**/
    if (window.cordova) {
      //Show banner when entering
      if (window.AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
      //Show Interstitial when exiting
      $scope.$on("$destroy", function() {
        if (window.AdMob) AdMob.showInterstitial();
      });
    }
    /**End Display Admob ads**/

  })
  .controller('PartenersCtrl', function($scope, $stateParams) {
    /**Start Google Analytics**/
    if (window.cordova) {
      if (typeof analytics !== undefined) {
        analytics.trackView("Parteners Screen");
      }
    }
    /**End Google Analytics**/
  })
  .controller('SponsorsCtrl', function($scope, $stateParams) {
    /**Start Google Analytics**/
    if (window.cordova) {
      if (typeof analytics !== undefined) {
        analytics.trackView("Sponsors Screen");
      }
    }
    /**End Google Analytics**/
  })
  .controller('InteractionsCtrl', function($scope, $stateParams) {
    /**Start Google Analytics**/
    if (window.cordova) {
      if (typeof analytics !== undefined) {
        analytics.trackView("Interactions Screen");
      }
    }
    /**End Google Analytics**/
  })
  .controller('DeveloperCtrl', function($scope, $stateParams) {
    /**Start Google Analytics**/
    if (window.cordova) {
      if (typeof analytics !== undefined) {
        analytics.trackView("Developer Screen");
      }
    }
    /**End Google Analytics**/
  });
