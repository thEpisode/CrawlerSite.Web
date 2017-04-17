Flinger.service("FormService", function ($http) {
    //CreateForm
    this.CreateForm = function (ApiKey, Name,Tags,Path,State) {
        var response = $http({
            method: "post",
            url: "/Form/CreateForm",
            params: {
                ApiKey: ApiKey,
                Name: Name,
                Tags: Tags,
                Path: Path,
                State: State
            }
        });
        return response;
    }

    //GetFormByApiKey
    this.GetFormByApiKey = function(ApiKey){
        var response = $http({
            method: "get",
            url: "/Form/GetFormByApiKey",
            params: {
                ApiKey: ApiKey
            }
        });
        return response;
    }

    //GetFormById
    this.GetFormById = function(Id){
        var response = $http({
            method: "get",
            url: "/Form/GetFormById",
            params: {
                Id: Id
            }
        });
        return response;
    }

    //GetAllForm
    this.GetAllForm = function () {
        return $http.get("/Form/GetAllForm");
    };

});