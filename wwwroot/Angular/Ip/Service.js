Flinger.service("IpService", function ($http) {
    //CreateIp
    this.CreateIp = function (ApiKey, IP, Name, State) {
        var response = $http({
            method: "post",
            url: "/Ip/CreateIp",
            params: {
                ApiKey: ApiKey,
                IP: IP,
                Name: Name,
                State: State
            }
        });
        return response;
    }

    this.GetIpByApiKey = function (ApiKey) {
        var response = $http({
            method: "get",
            url: "/Ip/GetIpByApiKey",
            params: {
                ApiKey: ApiKey
            }
        });
        return response;
    }

    this.GetIpById = function (Id) {
        var response = $http({
            method: "get",
            url: "/Ip/GetIpById",
            params: {
                Id: Id
            }
        });
        return response;
    }

    //GetAllObj
    this.GetAllIp = function () {
        return $http.get("/Ip/GetAllIp");
    };

    this.EditIp = function (data) {
        var response = $http({
            method: "post",
            url: "/Ip/EditIp",
            params: {
                Id: data.Id,
                IP: data.IP,
                Name: data.Name,
            }
        });
        return response;
    }

    this.DeleteIp = function (data) {
        var response = $http({
            method: "post",
            url: "/Ip/DeleteIp",
            params: {
                Id: data.Id,
            }
        });
        return response;
    }

});