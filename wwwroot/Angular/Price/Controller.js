Flinger.controller("PriceController", function ($scope, PriceService) {

    $scope.Prices = [];
    $scope.Price = {};

    $scope.InitializeIndexView = function () {
                
        var getAllPrice = PriceService.GetAllPrice();

        getAllPrice.then(function (response) {
            //console.log(response.data)
            
            $scope.Prices = response.data;
            
        },
        function (response) {
            console.log(response);
        })

    }
});