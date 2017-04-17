'use strict';

angular.module('makeYourTrip')
    .config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
        // We must whitelist the JSONP endpoint that we are using to show that we trust it
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://accedo-video-app-fe.herokuapp.com/**'
        ]);

        $stateProvider
            .state('home', {
                url: "/",
                views: {
                    'header': {
                        templateUrl: './app/views/header.html'
                    },
                    'main': {
                        templateUrl: './app/views/home.html'
                    },
                    'footer': {
                        templateUrl: './app/views/footer.html'
                    }
                }
            })
            .state('search', {
                url: "/search/:from/:to/:ddate/:pa/:pc/:pclass",
                views: {
                    'header': {
                        templateUrl: './app/views/header.html'
                    },
                    'main': {
                        templateUrl: './app/views/search.html'
                    },
                    'footer': {
                        templateUrl: './app/views/footer.html'
                    }
                }
            });

            $urlRouterProvider.otherwise("/");
    })
    .constant('appConstant', {
        'cityUrl': 'https://accedo-video-app-api.herokuapp.com/getCity',
        'flightUrl': 'https://accedo-video-app-api.herokuapp.com/getFlight',
        'flightSearchUrl': 'https://accedo-video-app-api.herokuapp.com/getAvailableFlight'
    })
