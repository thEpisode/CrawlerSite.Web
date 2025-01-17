Flinger.controller("UserController", function ($scope, UserService, SiteService) {

    $scope.Users = [];
    $scope.User = {};
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchUser = '';     // set the default search/filter term
    $scope.Sites = [];
    $scope.Site = {};
    $scope.siteOption = "";

    $scope.InitializeIndexView = function () {

        UserService.GetAllUser().then(function (response) {
            console.log(response)

            if (response.data.success === true) {
                $scope.Users = response.data.result;
                $Flinger.Loader.Finish();
            }
            else{
                $Flinger.Dialog.SetData("Error", response.data.message);
                $Flinger.Loader.Finish();
            }

        },
            function (response) {
                console.log(response);
                $Flinger.Loader.Finish()
            })

    }

    $scope.InitializeAddView = function () {
        $scope.User.RandomPassword = true;
        $scope.User.ResetPassword = false;
        $Flinger.Loader.Finish();
    }

    $scope.InitializeInvitedView = function () {

        var UserId = $Flinger.QueryString().Id;

        if (UserId != undefined && UserId != null) {
            UserService.GetUserById(UserId).then(function (response) {
                $scope.User = response.data.result;
                $scope.User.SendSameEmail = true;
                $Flinger.Loader.Finish();
                console.log(response.data);
            },
                function (response) {
                    console.log(response);
                })
        }
    }

    $scope.InitializeEditView = function () {
        var UserId = $Flinger.QueryString().Id;

        if (UserId != undefined && UserId != null) {
            UserService.GetUserById(UserId).then(function (response) {
                $scope.User = response.data.result;
                $Flinger.Loader.Finish();
                console.log(response.data);
            },
                function (response) {
                    console.log(response);
                })
        }
    }

    $scope.InitializeDeleteView = function () {
        var UserId = $Flinger.QueryString().Id;

        if (UserId != undefined && UserId != null) {
            UserService.GetUserById(UserId).then(function (response) {
                $scope.User = response.data.result;
                $Flinger.Loader.Finish();
                console.log(response.data);
            },
                function (response) {
                    console.log(response);
                })
        }
    }

    $scope.AddUser = function () {
        if ($("form[name='NewUserInfo']").valid() == true) {
            //form without errors
            //console.log('Form without errors')
            $Flinger.Loader.Init();
            var selectedSite = $scope.siteOption;

            var userData= {
                FirstName:$scope.User.FirstName,
                LastName:$scope.User.LastName,
                Email:$scope.User.Email,
                Country:$scope.User.Country,
                City:$scope.User.City,
                Password:$scope.User.Password,
                RandomPassword: $scope.User.RandomPassword,
                ResetPassword: $scope.User.ResetPassword,
            };

            //console.log(userData);

            UserService.AddUserToSubscription(userData)
                .then(function (response) {
                    //console.log(response)
                    if (response.data != undefined && response.data != null) {
                        console.log(response.data)
                        if (response.data.success == true) {
                            // edit succesfully
                            $Flinger.GoTo.Action('User', 'Invited?Id=' + response.data.result._id)
                        }
                        else {
                            $Flinger.Dialog.SetData("Something was wrong", response.data.message);
                            $Flinger.Loader.Finish()
                        }

                    }
                    else {
                        // can't edit 
                        console.log(response);
                    }
                },
                function (response) {
                    console.log(response);
                });
        }
        else {
            //Form without errors
            console.error('Form with errors')
            $Flinger.Dialog.SetData("Something was wrong", "Please provide all required fields.");
            $Flinger.Loader.Finish()
        }

    }

    $scope.EditUser = function () {
        $Flinger.Loader.Init();
        UserService.EditUser({
            _id: $scope.User._id,
            FirstName: $scope.User.FirstName,
            LastName: $scope.User.LastName,
            Email: $scope.User.Email,
            City: $scope.User.City,
            Country: $scope.User.Country,
        }).then(function (response) {
            if (response != undefined) {
                if (response.data.success == true) {
                    $Flinger.GoTo.ControllerIndex();
                }
                else {
                    $Flinger.Dialog.SetData('Error', response.data.message);
                    $Flinger.Loader.Finish();
                }
            }
        },
            function (response) {
                console.log(response);
            })
    }

    $scope.DeleteUser = function () {
        $Flinger.Loader.Init();
        UserService.DeleteUser($scope.User._id).then(function (response) {
            if (response != undefined) {
                if (response.data.success == true) {
                    $Flinger.GoTo.ControllerIndex();
                }
                else {
                    $Flinger.Dialog.SetData('Error', response.data.message);
                    $Flinger.Loader.Finish();
                }
            }
        },
            function (response) {
                console.log(response);
            });
    }
});

Flinger.directive("inputValidations", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            // ------ show password  ------       
            $('#myonoffswitch').on('click', function () {
                if (!this.checked) {
                    $('#mypassword').removeClass('hiddenpass');
                    $('#Createbtn').prop('disabled', true).removeClass("btn-fill ");
                    $('#NewPassword').val('');
                    $('#ConfirmPassword').val('');

                }
                else {
                    $('#mypassword').addClass('hiddenpass');
                    $('#Createbtn').prop('disabled', false).addClass("btn-fill ");
                }
            });

            // ------ validate  password  ------

            $('#Createbtn').prop('disabled', false).addClass("btn-fill ");
            $('#ConfirmPassword').on('keyup', function () {
                var password = $("#NewPassword").val();
                var confirmPassword = $("#ConfirmPassword").val();

                if (password != confirmPassword) {
                    $("#divCheckPassword").html("Passwords do not match!");
                    $('#Createbtn').prop('disabled', true).removeClass("btn-fill ");
                } else {
                    $("#divCheckPassword").html("Passwords match.");
                    $('#Createbtn').prop('disabled', false).addClass("btn-fill ");
                }
            });


            $("form[name='NewUserInfo']").validate({
                // Specify validation rules
                rules: {
                    // The key name on the left side is the name attribute
                    // of an input field. Validation rules are defined
                    // on the right side
                    Firstname: {
                        required: true,
                        minlength: 2
                    },
                    Lastname: {
                        required: true,
                        minlength: 2
                    },
                    Country: "required",
                    City: "required",


                    email: {
                        required: true,
                        // Specify that email should be validated
                        // by the built-in "email" rule
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 5
                    }
                },
                // Specify validation error messages
                messages: {

                    Firstname: {
                        required: "Please enter your first name",
                        minlength: "The firstname must be at least 2 characters long"
                    },
                    Lastname: {
                        required: "Please enter your  Last name",
                        minlength: "The lastname must be at least 2 characters long"
                    },

                    email: "Please enter a valid email address"
                },
                // Make sure the form is submitted to the destination defined
                // in the "action" attribute of the form when valid

            });
        }
    }
});

Flinger.directive("typeahead", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $('#Country').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
                {
                    name: 'countriesVal',
                    source: substringMatcher(countriesVal)
                }).on('typeahead:render', function () {
                    $('.tt-suggestion:first-child').addClass('tt-cursor');
                });

            $(".tt-hint").css("opacity", 0);
        }
    }
})