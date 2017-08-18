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
            //console.log(response.data)

            $scope.Subscription = response.data.result;

            // If has CustomerId... retrieve 
            if ($scope.Subscription.CustomerId != undefined && $scope.Subscription.CustomerId.length > 0) {
                BillingService.GetCustomerByUserId($scope.Subscription.CustomerId).then(function (response) {
                    //console.log(response.data)

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

                $Flinger.Dialog.SetData("Something was wrong", "In this moment we have some problems, please try again in few moments.");
                $Flinger.Loader.Finish()
            });
    }

    $scope.InitializePlanDetailView = function () {
        BillingService.GetSubscriptionByUserId().then(function (response) {
            //console.log(response.data)

            $scope.Subscription = response.data.result;

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
                $Flinger.Dialog.SetData("Something was wrong", "In this moment we have some problems, please try again in few moments.");
                $Flinger.Loader.Finish()
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

                $Flinger.Dialog.SetData("Something was wrong", "In this moment we have some problems, please try again in few moments.");
                $Flinger.Loader.Finish()
            })
    }

    $scope.SubscribeToPlan = function (token) {

        BillingService.SubscribeToPlan(
            $scope.Subscription.PlanId,
            $scope.Subscription.Email,
            'Payment of ' + $scope.Subscription.CreditCard.FirstNameCard + ' ' + $scope.Subscription.CreditCard.LastNameCard,
            token,
            $scope.Subscription.CreditCard.FirstNameCard,
            $scope.Subscription.CreditCard.LastNameCard
        ).then(function (response) {
            console.log(response);
            $Flinger.GoTo.Controller('Dashboard')
        },
            function (response) {
                console.log(response);
                $Flinger.Dialog.SetData("Something was wrong", "In this moment we have some problems, please try again in few moments.");
                $Flinger.Loader.Finish()
            })
    }

    $scope.SetPlanOnClick = function (selectedPlan) {
        $scope.$apply(function () {
            if (selectedPlan != $scope.Subscription.PlanId) {
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
                    $Flinger.GoTo.ControllerIndex();
                }
                else {
                    // can't edit 
                    console.log(response);
                }
            }
        },
            function (response) {
                $Flinger.Dialog.SetData("Something was wrong", "In this moment we have some problems, please try again in few moments.");
                $Flinger.Loader.Finish()
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