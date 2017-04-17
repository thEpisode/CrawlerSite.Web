Flinger.service("ClickService", function ($http) {
    //CreateClick
    this.CreateClick = function (ApiKey,Event,State) {
        var response = $http({
            method: "post",
            url: "/Click/CreateClick",
            params: {
                ApiKey: ApiKey,
				Event: Event,
				State: State
            }
        });
        return response;
    }

    //GetClickByApiKey
    this.GetClickByApiKey = function(ApiKey){
        var response = $http({
            method: "get",
            url: "/Click/GetClickByApiKey",
            params: {
                ApiKey: ApiKey
            }
        });
        return response;
    }

    //GetClickById
    this.GetClickById = function(Id){
        var response = $http({
            method: "get",
            url: "/Click/GetClickById",
            params: {
                ApiKey: ApiKey
            }
        });
        return response;
    }

    //GetAllClicks
    this.GetAllClick = function () {
        return $http.get("/Click/GetAllClick");
    };

});