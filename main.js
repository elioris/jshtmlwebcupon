(function() {
  var app = angular.module('myApp', ['ui.router']);
  /* run thet say to wabpage where to start */
  app.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
      });
    
      if(!LoginService.isAuthenticated()) {
        $state.transitionTo('home');
      }
  });
  /* config state thet detrmine how to call to cintroller in the script on html page  */
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'login.html',
        controller : 'LoginController'
      })
      .state('home', {
        url : '/home',
        templateUrl : 'home.html',
        controller : 'HomeController'
      })

      .state('registar', {
        url : '/register',
        templateUrl : 'cp.usr.generalregister.html',
        controller : 'RegistarController'

      })

	    .state('userregistar',{
        url :  '/userregistar',
        templateUrl : 'cp.usr.registararea.html',
        controller : 'UserRgistarArea'
      })

	    .state('companyregistar',{
          url : '/companyregistar',
          templateUrl : 'cp.com.registar.html',
          controller : 'CompanyAreaRegistar'
      })

	.state('clientarea',{
		url : '/clientarea' ,
		templateUrl : 'cp.clt.area.html',
		controller : 'ClinetArea'



})

	.state('companyarea',{
		url : '/companyarea',
		templateUrl : 'cp.com.area.html',
		controller: 'CompanyArea'


});


  }]);



/* bihiver for login page include function for login button */
  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService, $http) {
    $rootScope.title = "coupon Login ";
    
    $scope.formSubmit = function() {

      var userInfo = {
        params: {
          companyName: document.querySelector('[ng-model="username"]').value,
          password: document.querySelector('[ng-model="password"]')
        }
      }
      $http.post('your_url', userInfo)
      .then(function(data){
        if(data.success){
          $scope.error = '';
          $scope.username = '';
          $scope.password = '';
          $state.transitionTo('userArea');
        }else{
           $scope.error = "Incorrect username/password !";
        }
      })
      .catch(function(reason){
        console.log(reason)
      })

      // if(LoginService.login($scope.username, $scope.password)) {
      //   $scope.error = '';
      //   $scope.username = '';
      //   $scope.password = '';
      //   $state.transitionTo('userArea');
      // } else {
      //   $scope.error = "Incorrect username/password !";
      // }   
    };
    
  });
  
  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "welcome to home page";
    
  });


/* controller for chose wich on you are company or user*/
 app.controller('RegistarController' , function($scope, $rootScope, $stateParams, $state, LoginService){
		$rootScope.title="registar page";







  });


/* user registar area after selcting button*/
app.controller('UserRgistarArea', function($scope, $rootScope, $stateParams, $state, LoginService){
		$rootScope.title="user rgistar";
			
		



});

/* company registar area  */
app.controller('CompanyAreaRegistar', function($scope, $rootScope, $stateParams, $state, LoginService, $http){
		$rootScope.title="company rgistar";

    $scope.validateCompanyUser = function(){

      var mail = document.querySelector('[ng-model="user_mail"]').value;
      var name = document.querySelector('[ng-model="username"]').value;
      var pass = document.querySelector('[ng-model="password"]').value;
      
      var config = {
        params: {
            companyName: name,
            password: pass,
            email : mail
        }
      }

      $http.post('/someUrl', config)
      .then(
        function(data){
          console.log(data)
          $state.transitionTo('companyarea');
        }
      )
      .catch(function(reason){
        console.log(reason);
      })
  }


});


 /*clint area for doing is manamant*/
 app.controller('ClinetArea', function($scope, $rootScope, $stateParams, $state, LoginService){

	$rootScope.title = "your parsonal detiles";




});
/* company area for mangmant is coupons */
app.controller('CompanyArea',function($scope, $rootScope, $stateParams, $state, LoginService, $http){

		$rootScope.title="company area mangmant";

     var config = {
      params: {
          id: $scope.companyID
      }
    }

    $http.get('/someUrl', config)
    .then(
      function(data){
        console.log(data)
      }
    )
    .catch(function(reason){
      console.log(reason);
    })



});
/* login factory thet verify the password and user name */
  app.factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };

    
  });
/* table for coupon information in home page throw controller  */
app.controller("coupons", function($scope, $rootScope, $stateParams, $state, LoginService) {
  $scope.coupon = [
    {
      "company" : "Alfreds Futterkiste",
      "Country" : "Germany",
      "off" : "15%"
    },
    {
      "company" : "Berglunds snabbköp",
      "Country" : "Sweden",
      "off" : "30%"
    },
    {
      "company" : "Centro comercial Moctezuma",
      "Country" : "Mexico",
       "off" : "20%"
    },
    {
      "company" : "Ernst Handel",
      "Country" : "Austria",
	"off" : "10%"
    }
  ]
});


  
})();
