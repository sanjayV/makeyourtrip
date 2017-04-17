'use strict';

flightController.$inject = ['$scope', 'flightService', 'appConstant', '$state'];
function flightController($scope, flightService, appConstant, $state) {
    var _this = this;
    $scope.selectedAd = 1;
    $scope.selectedCh = 0;
    $scope.totalPassenger = 1;
    $scope.selectedClass = 1;
    $scope.selectedDate = "";
    $scope.selectedClassName = 'Economy'

    flightService.getP(appConstant.cityUrl, function(res) {
        if (res && res.status !== undefined && res.result && res.result.length) {
            $scope.cities = res.result;
            flightService.cities = res.result;
        } else {
            $scope.showCity = 'no record';
            console.log('WS error for save history for video');
        }
    });

    $scope.setPassenger = function(count, type) {
    	if (type == 'ch') {
    		$scope.selectedCh = count;
    	} else {
    		$scope.selectedAd = count;
    	}

    	$scope.totalPassenger = $scope.selectedAd + $scope.selectedCh;
    };

    $scope.setClass = function(classType, name) {
    	$scope.selectedClass = classType;
    	$scope.selectedClassName = name;
    };

    $scope.getFlight = function() {
    	console.log()
    	if ($scope.fromLocation && $scope.toLocation && $scope.departDate && $scope.selectedAd && $scope.selectedClass) {
    		$scope.selectedDate = Date.parse($scope.departDate);
    		$state.go('search', { 
    			from: $scope.fromLocation, 
    			to: $scope.toLocation, 
    			ddate: $scope.selectedDate, 
    			pa: $scope.selectedAd, 
    			pc: $scope.selectedCh,
    			pclass: $scope.selectedClass
    		});
    	} else {
    		alert('Invalid values provided');
    	}
    };
}

angular.module('makeYourTrip').controller('flightController', flightController);