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

Flinger.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

Flinger.filter('stripeDate', function () {
    return function (input) {
        return (!!input) ? new Date(input).getDate() + '/' + ((new Date(input).getMonth()) + 1) + '/' + new Date(input).getFullYear() : '';
    }
});

Flinger.controller("RedeemVoucher", function RedeemVoucher($scope) {
    $scope.InitBox = function () {console.log();
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
        //document.querySelector('.invition-code-register').addEventListener('paste', handlePaste);

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
                                    $Flinger.Loader.Finish()
                                }
                            }
                            else if (response.success !== undefined && response.success === false) {
                                $('#invition-code-register').prop('disabled', false);
                                $('.input-group-addon-error').show();
                                $('.input-group-addon-check').hide();

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
});
