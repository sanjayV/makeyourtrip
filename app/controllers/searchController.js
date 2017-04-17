'use strict';

searchController.$inject = ['$scope', 'flightService', 'appConstant', '$state', '$filter', '$compile', 'flightFilter', 'orderByFilter'];

function searchController($scope, flightService, appConstant, $state, $filter, $compile, flightFilter, orderBy) {
    var _this = this;
    $scope.priceRange = { 'min': 1000, 'max': $scope.priceRange, 'classType': 50000 };
    $scope.priceRangeSlider = 50000;
    if (flightService.cities && flightService.cities.length) {
        $scope.cities = angular.copy(flightService.cities);
        getParams();
    } else {
        flightService.getP(appConstant.cityUrl, function(res) {
            if (res && res.status !== undefined && res.result && res.result.length) {
                $scope.cities = angular.copy(res.result);
                flightService.cities = res.result;
                getParams();
            } else {
                $scope.showCity = 'no record';
                console.log('WS error for save history for video');
                alert('error in web-service call');
            }
        });
    }

    function getParams() {
        console.log($state.params)
        $scope.fromLocation = $filter('filter')($scope.cities, { iata: $state.params.from }, true)[0];
        $scope.toLocation = $filter('filter')($scope.cities, { iata: $state.params.to }, true)[0];
        $scope.dDate = $state.params.ddate;
        $scope.adultP = $state.params.pa;
        $scope.childP = $state.params.pc;
        $scope.pClass = $state.params.pclass;
        $scope.filterd = {
            'pClass': angular.copy($scope.pClass),
            'adultP': angular.copy($scope.adultP),
            'childP': angular.copy($scope.childP),
        }

        getFlight();
        getAvailableFlight();
    }

    function getFlight() {
        flightService.getP(appConstant.flightUrl, function(res) {
            if (res && res.status !== undefined && res.result && res.result.length) {
                $scope.flightData = angular.copy(res.result);
            } else {
                $scope.showCity = 'no record';
                console.log('WS error for save history for video');
                alert('error in web-service call');
            }
        });
    }

    function getAvailableFlight() {
        flightService.getP(appConstant.flightSearchUrl, function(res) {
            if (res && res.status !== undefined && res.result && res.result.length) {
                $scope.flightServiceTemp = angular.copy(res.result);
                $scope.flightAvailable = angular.copy(res.result);
            } else {
                $scope.showCity = 'no record';
                console.log('WS error for save history for video');
                alert('error in web-service call');
            }
        });
    }

    $scope.orderByFn = function(fieldName) {
        $scope.shortedField = fieldName;
        $scope.shortFlag = false;
        if ($scope.temp && fieldName == $scope.temp) {
            $scope.shortFlag = true;
            $scope.temp = "";
        } else {
            $scope.temp = fieldName;
        }

        $scope.flightAvailable = orderBy($scope.flightAvailable, fieldName, $scope.shortFlag);
    };

    $scope.getRange = function() {
        $scope.priceRange = { 'min': 1000, 'max': $scope.priceRangeSlider, 'classType': $scope.pClass };
        $scope.filterData();
    };

    $scope.flightTypeSelection = [];
    // Toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(flight) {
        var idx = $scope.flightTypeSelection.indexOf(flight);

        if (idx > -1) {
            $scope.flightTypeSelection.splice(idx, 1);
        } else {
            $scope.flightTypeSelection.push(flight);
        }
        console.log($scope.flightTypeSelection);
        $scope.filterData();
    };

    $scope.filterData = function() {
        //var priceRange = { 'min': 1000, 'max': 6000, 'classType': $scope.pClass };
        var newObj = flightFilter($scope.flightServiceTemp, $scope.flightTypeSelection, $scope.priceRange);
        if (newObj) {
            console.log(newObj)
            $scope.flightAvailable = newObj;
        }
    }
}

angular.module('makeYourTrip').controller('searchController', searchController);
