Flinger.controller("AccountController", function ($scope, AccountService) {

    $scope.FullName = "";
    $scope.User = {};
    $scope.Pass = {
        New: '',
        ConfirmNew: '',
        Old: '',
    }

    $scope.InitializeIndexView = function () {
        AccountService.GetUserById().then(function (response) {
            console.log(response.data)

            $scope.User = response.data.result;

            $scope.FullName = $scope.User.FirstName + " " + $scope.User.LastName;

            $Flinger.Loader.Finish();
        },
            function (response) {
                console.log(response);
            });
    }

    $scope.InitializeDeleteView = function () {
        $Flinger.Loader.Finish();
    }

    $scope.InitializeChangePassView = function () {
        $Flinger.Loader.Finish();
    }

    $scope.ChangePassword = function () {
        if ($scope.Pass.New === $scope.Pass.ConfirmNew) {
            $Flinger.Loader.Init();
            AccountService.ChangePasswordByUserId({ Old: $scope.Pass.Old, ConfirmNew: $scope.Pass.ConfirmNew }).then(function (response) {
                if (response != undefined) {
                    if (response.data.success == true) {
                        $Flinger.Dialog.SetData(
                            'You\'re secure!',
                            'Password changed successfully.',
                            [{
                                text: 'OK',
                                className: $Flinger.Dialog.GetAcceptButtonStyle()
                            }]);
                        $Flinger.Loader.Finish();
                    }
                    else {
                        $Flinger.Dialog.SetData(
                            'Error',
                            response.data.message);
                        $Flinger.Loader.Finish();
                    }
                }
            },
                function (response) {
                    console.log(response);
                });
        }
        else {
            $Flinger.Dialog.SetData(
                'Error',
                'New passwords not match, please verify your new password.',
                [{
                    text: 'OK',
                    className: $Flinger.Dialog.GetAcceptButtonStyle()
                }]);
        }
    }

    $scope.DeleteAccount = function () {
        $Flinger.Loader.Init();
        AccountService.DeleteAccountByUserId().then(function (response) {
            if (response != undefined) {
                if (response.data.success == true) {
                    $Flinger.GoTo.Action('Home', 'Thanks');
                }
                else {
                    $Flinger.Dialog.SetData(
                        'Error',
                        response.data.message);
                    $Flinger.Loader.Finish();
                }
            }
        },
            function (response) {
                console.log(response);
            });
    }
});