var Flinger = angular.module('Flinger', ['ngRoute']);

Flinger.factory('TokenInjector', ['$log', '$q', '$location', function ($log, $q) {


    var TokenInjector = {
        request: function (config) {

            if (localStorage.getItem("auth_token") != undefined && localStorage.getItem("auth_token") != null) {
                config.headers['x-access-token'] = localStorage.getItem("auth_token");

                return config;
            }
            else if (config.url === '/Dashboard/Login') {
                return config;
            }
            console.log('Please login into Flinger');
            return null;
        }
    }

    return TokenInjector;
}]);

Flinger.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInjector');
}]);

Flinger.filter('stripeAmount', function () {
    return function (input, separator) {
        input = input.toString();

        return input.toString().substr(0, (input.length - 2)) + ',' + input.substr((input.length - 2));
    }
});

Flinger.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

Flinger.filter('stripeDate', function() {
    return function(input) {
      return (!!input) ? new Date(input).getDate() + '/' + ((new Date(input).getMonth())+ 1) + '/' + new Date(input).getFullYear() : '';
    }
});