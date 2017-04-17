Flinger.controller("FormController", function ($scope, FormService) {

    $scope.MyArray = [];
    $scope.MyObject = {};

    $scope.InitializeIndexView = function () {
                
        var getAllObj = FormService.GetAllObj();

        getAllObj.then(function (response) {
            //console.log(response.data)
            
            $scope.MyArray = response.data;
            
        },
        function (response) {
            console.log(response);
        })

    }

});