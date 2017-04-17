Flinger.controller("ClickController", function ($scope, ClickService) {

    $scope.Clicks = [];
    $scope.Click = {};

    $scope.InitializeIndexView = function () {
                
        var getAllClick = ClickService.GetAllClick();

        getAllClick.then(function (response) {
            //console.log(response.data)
            
            $scope.Clicks = response.data;
            
        },
        function (response) {
            console.log(response);
        })

    }

});