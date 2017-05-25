Flinger.service("AdminVoucherService", function ($http) {
    //CreateEarlyBirdVoucher
    this.GenerateEarlyBird = function (Email) {
        var response = $http({
            method: "post",
            url: "/Voucher/GenerateEarlyBirdVoucher",
            params: {
                Email: Email,
            }
        });
        return response;
    }

    this.RedeemVoucherCode = function (Email) {
        var response = $http({
            method: "post",
            url: "/Voucher/RedeemVoucher",
            params: {
                VoucherId: $('.invition-code-register').val(),
                UserId: $Flinger.ReadPersistentData('userId')
            }
        });
        return response;
    }
});