Flinger.service("MovementService", function ($http) {
    //CreateObj
    this.CreateMovement = function (ApiKey, Event, State) {
        var response = $http({
            method: "post",
            url: "/Movement/CreateMovement",
            params: {
                ApiKey: ApiKey,
				Event: Event,
				State: State
            }
        });
        return response;
    }

    this.GetMovementByApiKey = function(ApiKey){
        var response = $http({
            method: "get",
            url: "/Movement/GetMovementByApiKey",
            params: {
                ApiKey: ApiKey
            }
        });
        return response;
    }

    this.GetMovementById = function(Id){
        var response = $http({
            method: "get",
            url: "/Movement/GetMovementById",
            params: {
                Id: Id
            }
        });
        return response;
    }

    //GetAllObj
    this.GetAllMovement = function () {
        return $http.get("/Movement/GetAllMovement");
    };

});