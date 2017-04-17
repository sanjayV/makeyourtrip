function gridTrip() {
    return {
        restrict: 'EA',
        scope: {
            data: '=data',
            filterd: '=filterd'
        },
        templateUrl: 'app/views/grid.html',
        link: function(scope, element, attrs) {
            scope.getStopage = function(stopObj) {
                if (Object.keys(stopObj).length) {
                    var stop = Object.keys(stopObj).length + " stop  ";
                    angular.forEach(stopObj, function(v, k) {
                        stop += k + ' at ' + v + ', ';
                    });
                    return stop;
                } else {
                    return 'Non stop';
                }
            }

            scope.getPrice = function(priceObj) {
                var tot = 0;
                tot += priceObj.adult[scope.filterd.pClass] * scope.filterd.adultP;
                tot += priceObj.child[scope.filterd.pClass] * scope.filterd.childP;
                return tot;
            }
        }
    }
}

angular.module('makeYourTrip').directive('gridTrip', gridTrip);
