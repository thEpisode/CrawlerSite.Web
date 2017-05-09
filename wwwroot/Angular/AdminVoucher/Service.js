Flinger.service("AdminVoucher", function ($http) {
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
});