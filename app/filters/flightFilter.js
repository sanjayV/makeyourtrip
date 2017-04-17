var flight = function() {
    return function(input, flightType, priceRange) {
        if (input && ((flightType && flightType.length) || (priceRange && priceRange.min && priceRange.max && priceRange.classType))) {
            var tempObj = [];
            //alert('in')
            if (flightType && flightType.length) {
                angular.forEach(input, function(v, k) {
                    if (flightType.indexOf(v.flight.name) > -1) {
                        console.log('tempObj', tempObj)
                        tempObj.unshift(v);
                    }
                });
            } 

            if (input && priceRange && priceRange.min && priceRange.max && priceRange.classType) {
                var useVar = angular.copy(input);
                if (tempObj.length) {
                    useVar = angular.copy(tempObj);
                }

                tempObj = [];
                angular.forEach(useVar, function(v, k) {
                    if (v.price.adult[priceRange.classType] >= priceRange.min && v.price.adult[priceRange.classType] <= priceRange.max) {
                        tempObj.unshift(v);
                    }
                });
            }

            return tempObj;
        } else {
            //alert('out')
            return input;
        }
    };
};
angular.module('makeYourTrip').filter('flight', flight)
