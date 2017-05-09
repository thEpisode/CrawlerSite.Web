Flinger.controller("AdminVoucherController", function ($scope, AdminVoucherService) {

    $scope.Scrolls = [];
    $scope.Scroll = {};

    $scope.InitializeIndexView = function () {
        //
    }

    $scope.GenerateEarlyBird = function () {
        VoucherService.GenerateEarlyBird().then(function (response) {

        },
            function (response) {
                console.log(response);
            });
    }
});