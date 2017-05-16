Flinger.controller("AdminVoucherController", function ($scope, AdminVoucherService) {

    $scope.AdminVoucher = {};

    $scope.InitializeIndexView = function () {
        //
    }

    $scope.GenerateEarlyBird = function () {
        
        if ($scope.AdminVoucher.Email != undefined && $scope.AdminVoucher.Email !== null) {
            if ($scope.AdminVoucher.Email.length > 0) {
                $Flinger.Loader.Init();
                AdminVoucherService.GenerateEarlyBird($scope.AdminVoucher.Email).then(function (response) {
                    //console.log(response);
                    if (response.data.success != undefined) {
                        if (response.data.success == false) {
                            $Flinger.Dialog.SetData("Oops, some errors", response.data.message);
                            $Flinger.Loader.Finish();
                        }
                        else {
                            $scope.AdminVoucher = {};
                            $Flinger.Dialog.SetData("Voucher generated!", 'Your Early Bird Access is: ' + response.data.result.StripeData.id);
                            $Flinger.Loader.Finish();
                        }
                    }
                },
                    function (response) {
                        $Flinger.Dialog.SetData("Try Again", response.data.message);
                        $Flinger.Loader.Finish();
                        console.log(response);
                    });
            }
        }
    }

    $scope.VoucherIsValid = false;

    $scope.InitBox = function () {
        console.log();
        $('.input-group').css('width', '100%');
        $('.invition-code-register').css('border-right', '1px solid #ccc');
        $('.input-group-addon').hide();
    }

    $scope.ValidateVoucher = function () {
        document.body.addEventListener("paste", function (event) {
            if (document.querySelector('.invition-code-register') != null) {
                handlePaste(event);
            }
        });

        function handlePaste(e) {
            var clipboardData, pastedData;

            // Stop data actually being pasted into div
            e.stopPropagation();
            e.preventDefault();

            // Hide tooltip
            $("#invition-code-register").tooltip('show');

            // Get pasted data via clipboard API
            clipboardData = e.clipboardData || window.clipboardData;
            pastedData = clipboardData.getData('Text');

            // Do whatever with pasteddata
            checkVoucher(pastedData);
        }

        var checkVoucher = function (voucher) {
            if (voucher.length === 13) {
                document.querySelector("#invition-code-register").value = voucher
                $('#invition-code-register').prop('disabled', true);
                $Flinger.Loader.Init();
                $.ajax({
                    url: "/Voucher/VerifyVoucher",
                    type: "POST",
                    crossDomain: true,
                    data: { VoucherId: voucher },
                    dataType: "json",
                    success: function (response) {
                        console.log(response)
                        if (response !== undefined) {
                            if (response.success !== undefined && response.success !== false) {
                                if (response.Result !== null) {
                                    $('.input-group-addon-check').show();
                                    $('.input-group-addon-error').hide();
                                    $scope.VoucherIsValid = true;
                                    $Flinger.Loader.Finish()
                                }
                            }
                            else if (response.success !== undefined && response.success === false) {
                                $('#invition-code-register').prop('disabled', false);
                                $('.input-group-addon-error').show();
                                $('.input-group-addon-check').hide();
                                $scope.VoucherIsValid = false;

                                if ($Flinger.Dialog.IsOpen()) {
                                    $("#invition-code-register").tooltip('hide').attr(
                                        'data-original-title', "Please verify your voucher: " + response.message
                                    ).tooltip('show');
                                }
                                else {
                                    $Flinger.Dialog.SetData("Please verify your voucher", response.message);
                                }
                                $Flinger.Loader.Finish()
                            }
                            else {
                                $scope.VoucherIsValid = false;
                                $('#invition-code-register').prop('disabled', false);

                                if ($Flinger.Dialog.IsOpen()) {
                                    $("#invition-code-register").tooltip('hide').attr(
                                        'data-original-title', "In this moment we have some problems, please try again in few moments."
                                    ).tooltip('show');
                                }
                                else {
                                    $Flinger.Dialog.SetData("Something was wrong", "In this moment we have some problems, please try again in few moments.");
                                }
                                $Flinger.Loader.Finish()
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        switch (xhr.status) {
                            case 500:
                            default:
                                $('#invition-code-register').prop('disabled', false);
                                $scope.VoucherIsValid = false;
                                if ($Flinger.Dialog.IsOpen()) {
                                    $("#invition-code-register").tooltip('hide').attr(
                                        'data-original-title', "In this moment we have some problems, please try again in few moments."
                                    ).tooltip('show');
                                }
                                else {
                                    $Flinger.Dialog.SetData("Something was wrong", "In this moment we have some problems, please try again in few moments.");
                                }
                                $Flinger.Loader.Finish()
                        }
                        console.log(error);
                    }
                });
            }
        }
    }

    $scope.RedeemVoucherCode = function () {
        if ($scope.VoucherIsValid === true) {
            AdminVoucherService.RedeemVoucherCode().then(function(response){
                $Flinger.Dialog.Toggle();
            }, function(response){
                console.log(response)
            });
        }

    }
});