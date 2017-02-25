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
        console.log('cancelling');
      }

      i++;
      $scope.safeApply();
    }, 100);
  })
  .controller('MainCtrl', function($scope, $state, $filter, $stateParams, $http, $ionicLoading, DrugService, $ionicPush, $cordovaGoogleAnalytics) {
    //Start here
    $scope.drugs = [];
    $scope.numberOfItemsToDisplay = 10; // Use it with limit to in ng-repeat
    // var drugs = [];
    //http service
    DrugService.GetDrug().then(function(drugs) {
      // drugs = drugs;
      $scope.drugs = drugs;
     });
    // $scope.onSearch = function() {
    //   $scope.drugs = drugs.filter(function(drug) {
    //     return drug.tradename.match($scope.search)
    //   })
    // }

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
      console.log(mySelect);
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
      console.log('Token saved:', t.token);
    });
    $scope.$on('cloud:push:notification', function(event, data) {
      var msg = data.message;
      alert(msg.title + ': ' + msg.text);
    });
    //Google Analytics
    // if (typeof analytics !== 'undefined') {
    //   $cordovaGoogleAnalytics.trackView('Home Screen');
    // }
    // $scope.initEvent = function() {
    //   if (typeof analytics !== undefined) {
    //     analytics.trackEvent("Category", "Action", "Label", 25);
    //   }
    // }


  })


  .controller('MenuCtrl', function($scope, $state) {})
  .controller('AppCtrl', function($scope, $state) {})

  .controller('DrugCtrl', function($scope, $ionicLoading, DrugService, $stateParams, $cordovaGoogleAnalytics) {
    var id = $stateParams.drugId;
    $scope.drug = {};

    //the single drug activeingredient
    //after the push now it has that drug AI
    var drugActiveingredient = []

    //array of objects of similar drugs
    $scope.similars = [];

    DrugService.GetDrug().then(function(drugs) {
      for (var i = 0; i < drugs.length; i++) {
        if (drugs[i].id == id) {
          //the $scope.drug is an object of this drug details
          $scope.drug = drugs[i];
          //  console.log(drugs[i].activeingredient);
          console.log($scope.drug.activeingredient);
          //  console.log(typeof analytics);
          if (typeof analytics !== 'undefined') {
            $cordovaGoogleAnalytics.trackView($scope.drug.activeingredient);
          }
          drugActiveingredient.push(drugs[i].activeingredient)
        }
      }
      console.log(drugActiveingredient);
      for (var i = 0; i < drugs.length; i++) {
        if (drugs[i].activeingredient == drugActiveingredient) {
          console.log(drugs[i])
          var obj = {
            id: drugs[i].id,
            tradename: drugs[i].tradename
          }
          $scope.similars.push(obj)
          console.log($scope.similars);
        }
      }
    });





  })
  .controller('PartenersCtrl', function($scope, $stateParams) {

  })
  .controller('SponsorsCtrl', function($scope, $stateParams) {

  })
  .controller('DeveloperCtrl', function($scope, $stateParams) {

  })


  .controller('QuickCtrl', function($scope, $stateParams, $http, $ionicLoading, DrugService) {
    //Start here
    $scope.drugs = [];
    $scope.numberOfItemsToDisplay = 10; // Use it with limit to in ng-repeat

    DrugService.GetDrug().then(function(drugs) {
      $scope.drugs = drugs;
    });

    $scope.addMoreItem = function(done) {
      if ($scope.drugs.length > $scope.numberOfItemsToDisplay)
        $scope.numberOfItemsToDisplay += 10; // load number of more items
      $scope.$broadcast('scroll.infiniteScrollComplete')
    };

  })

  .filter('trustURL', function($sce) {
    return function(url) {
      var newurl = 'https://www.google.com/search?q=' + url + ' drug'
      return $sce.trustAsResourceUrl(newurl);
    };
  });
