Flinger.controller("InsightsController", function ($scope, InsightsService) {

    $scope.MyArray = [];
    $scope.MyObject = {};

    $scope.InitializeView = function () {
        //Do something...
        $Flinger.Loader.Finish()
    }

    $scope.VoteForFunctionality = function(){
        console.log('Vote');
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
                            scope.VoteForFunctionality();
                        }
                    }]);
            });
        }
    }
});