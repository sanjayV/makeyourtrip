var range = function() {
    return function(input, priceRange) {
        var tempObj = [];
        if (input && priceRange && priceRange.min && priceRange.max && priceRange.classType) {
            angular.forEach(input, function(v, k) {
                if (v.price.adult[priceRange.classType] >= priceRange.min && v.price.adult[priceRange.classType] <= priceRange.max) {
                    tempObj.unshift(v);
                }
            });
            return tempObj;
        } else {
            return input;
        }
    };
};
angular.module('makeYourTrip').filter('range', range)
