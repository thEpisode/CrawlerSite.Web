Flinger.controller("InsightsController", function ($scope, InsightsService) {

    $scope.MyArray = [];
    $scope.MyObject = {};

    $scope.InitializeView = function () {
        //Do something...
        $Flinger.Loader.Finish()
    }

    $scope.VoteForFunctionality = function (feature) {
        $Flinger.Dialog.Toggle();
        InsightsService.VoteByFeature(feature).then(function (response) {
            if(response.data.success === true){
                $Flinger.Dialog.SetData("Thanks!", "Our developers are working in this functionality more fast for you :D");
            }
            else if(response.data.success === false){
                $Flinger.Dialog.SetData("Something was wrong", "In this moment we have some problems, please try again in few moments.");
            }
        }, function (response) {
            console.log(response);

            $Flinger.Dialog.SetData("Something was wrong", "In this moment we have some problems, please try again in few moments.");
        })
    }

});

Flinger.directive("comingSoonOnClick", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $Flinger.Dialog.SetData(
                    "We are developing this functionality!",
                    'You can vote if you want as soon posible',
                    [{
                        text: 'VOTE UP',
                        className: $Flinger.Dialog.GetAcceptButtonStyle(),
                        callback: function () {
                            scope.VoteForFunctionality(attrs.feature);
                        }
                    }]);
            });
        }
    }
});