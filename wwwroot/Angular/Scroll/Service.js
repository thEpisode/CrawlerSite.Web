Flinger.service("ScrollService", function ($http) {
    //CreateObj
    this.CreateScroll = function (ApiKey, Event, State) {
        var response = $http({
            method: "post",
            url: "/Scroll/CreateScroll",
            params: {
                ApiKey: ApiKey,
                Event: Event,
                State: State
            }
        });
        return response;
    }

    this.GetScrollByApiKey = function(ApiKey){
        var response = $http({
            method: "get",
            url: "/Scroll/GetScrollByApiKey",
            params: {
                ApiKey: ApiKey
            }
        });
        return response;
    }

    this.GetScrollById = function(Id){
        var response = $http({
            method: "get",
            url: "/Scroll/GetScrollById",
            params: {
                Id: Id
            }
        });
        return response;
    }

    //GetAllObj
    this.GetAllScroll = function () {
        return $http.get("/Scroll/GetAllScroll");
    };

});