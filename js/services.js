angular.module('starter.services', [])
.factory('DrugService', function($http){
	var BASE_URL = "js/drug.json";
	var drugs = [];

	return {
		GetDrug: function(){
			return $http.get(BASE_URL).then(function(response){
				drugs = response.data;
				return drugs;
			});
		}
	}
});
