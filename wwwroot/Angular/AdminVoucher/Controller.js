Flinger.controller("AdminVoucherController", function ($scope, AdminVoucherService) {

    $scope.AdminVoucher = {};

    $scope.InitializeIndexView = function () {
        //
    }

    $scope.GenerateEarlyBird = function () {
        $Flinger.Loader.Init();
        AdminVoucherService.GenerateEarlyBird($scope.AdminVoucher.Email).then(function (response) {
            console.log(response)
            if (response.data.success != undefined) {
                if (response.data.success == false) {
                    $Flinger.Dialog.SetData("Oops, some errors", response.data.message);
                }
                else {
                    $scope.AdminVoucher = {};
                    $Flinger.Dialog.SetData("Voucher generated!", 'Your Early Bird Access is: ' + response.data.result.StripeData.id);
                    $Flinger.Loader.Finish();
                }
            }
        },
            function (response) {
                console.log(response);
            });
    }
});