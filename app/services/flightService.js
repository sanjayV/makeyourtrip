'use strict';

flightService.$inject = ['$http'];
function flightService($http) {
    this.getP = function(url, next, error) {
        $http({
            method: 'GET',
            url: url
        }).success(function(data) {
            if (next) {
                next({ 'status': 'success', result: data });
            }
        }).error(function(data, status, headers, config) {
            if (error) {
                error({ 'status': 'error', result: data });
            }
        });
    }

    this.cities = [];
}

angular.module('makeYourTrip').service('flightService', flightService);