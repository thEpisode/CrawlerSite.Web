Flinger.controller("MovementController", function ($scope, MovementService) {

    $scope.Movements = [];
    $scope.Movement = {};

    $scope.InitializeIndexView = function () {
                
        var getAllMovement = MovementService.GetAllMovement();

        getAllMovement.then(function (response) {
            //console.log(response.data)
            
            $scope.Movements = response.data;
            
        },
        function (response) {
            console.log(response);
        })

    }

});