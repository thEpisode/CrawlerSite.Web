Flinger.controller("BillingController", function ($scope, BillingService) {

    $scope.MyArray = [];
    $scope.Subscription = {};
    $scope.Plans = [];
    $scope.changePlanButton = false;
    $scope.selectedPlan = '';
    $scope.Customer = {};
    $scope.IsChangeCreditCardValue = false;
    $scope.UserCharges = [];
    $scope.TodayMonth = '';
    $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $scope.InitializeIndexView = function () {
        $scope.TodayMonth = $scope.monthNames[(new Date().getMonth())];
        BillingService.GetSubscriptionByUserId().then(function (response) {
            console.log(response.data)

            $scope.Subscription = response.data.result;

            // If has CustomerId... retrieve 
            if ($scope.Subscription.CustomerId != undefined && $scope.Subscription.CustomerId.length > 0) {
                BillingService.GetCustomerByUserId($scope.Subscription.CustomerId).then(function (response) {
                    console.log(response.data)

                    $scope.Customer = response.data.result;

                    $Flinger.Loader.Finish();
                })
            }
            else {
                $Flinger.Loader.Finish();
            }
        },
            function (response) {
                console.log(response);

                $Flinger.Loader.Finish();
            });
    }

    $scope.InitializePlanDetailView = function () {
        BillingService.GetUserById().then(function (response) {
            //console.log(response.data)

            $scope.User = response.data.result;

            BillingService.GetAllPlans().then(function (response) {
                //console.log(response.data.data);

                $scope.Plans = response.data.data;
                $Flinger.Loader.Finish();
            },
                function (response) {
                    console.log(response);
                });
        },
            function (response) {
                console.log(response);
            });

    }

    $scope.InitializeBillingHistoryView = function () {
        BillingService.GetChargesByUserId().then(function (response) {
            //console.log(response.data)

            $scope.UserCharges = response.data.result.data;

            $Flinger.Loader.Finish();
        },
            function (response) {
                console.log(response);

                $Flinger.Loader.Finish();
            })
    }

    $scope.SubscribeToPlan = function (token) {

        BillingService.SubscribeToPlan(
            '',
            $scope.User.Email,
            'Payment of ' + $scope.User.FirstNameCard + ' ' + $scope.User.LastNameCard,
            token.id,
            $scope.User.FirstNameCard,
            $scope.User.LastNameCard
        ).then(function (response) {
            console.log(response);
            location.assign("/Dashboard/")
        },
            function (response) {
                console.log(response);
            })
    }

    $scope.SetPlanOnClick = function (selectedPlan) {
        $scope.$apply(function () {
            if (selectedPlan != $scope.User.PlanId) {
                $scope.changePlanButton = true;
            }
            else {
                $scope.changePlanButton = false;
            }

            $scope.selectedPlan = selectedPlan;
        });
    }

    $scope.ChangePlanOnClick = function () {
        $Flinger.Loader.Init();

        BillingService.ChangePlan($scope.selectedPlan).then(function (response) {
            if (response.data != undefined && response.data != null) {
                // edit succesfully
                if (response.data.success == true) {
                    location.assign("/Billing/");
                }
                else {
                    // can't edit 
                    console.log(response);
                }
            }
        })
    }

    $scope.ChangeCreditCardValue = function () {
        $scope.IsChangeCreditCardValue = !$scope.IsChangeCreditCardValue;
        console.log($scope.IsChangeCreditCardValue)
    }

});

Flinger.directive("planDetailOnClick", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(elem).click(function () {
                $('.plan-detail').removeClass('plan-detail-selected');
                $(this).addClass('plan-detail-selected');

                scope.SetPlanOnClick($(this).data('id'));
            });
        }
    }
});