Flinger.controller("ScrollController", function ($scope, ScrollService) {

    $scope.Scrolls = [];
    $scope.Scroll = {};

    $scope.InitializeIndexView = function () {
                
        var getAllScroll = ScrollService.GetAllScroll();

        getAllScroll.then(function (response) {
            //console.log(response.data)
            
            $scope.Scrolls = response.data;
            
        },
        function (response) {
            console.log(response);
        })

    }

});