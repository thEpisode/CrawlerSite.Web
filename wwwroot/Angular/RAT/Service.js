Flinger.service("RATService", function ($http) {
    this.GetSocketUrl = function (Id) {
        var response = $http({
            method: "GET",
            url: "/Insights/GetSocketUrl",
            params: {

            }
        });
        return response;
    }

    this.GetSiteById = function (Id) {
        var response = $http({
            method: "GET",
            url: "/Site/GetSiteById",
            params: {
                Id: Id
            }
        });
        return response;
    }

    this.EditBlockUserText = function (SiteId, Text) {
        var response = $http({
            method: "POST",
            url: "/Site/EditBlockUserText",
            params: {
                Id: SiteId,
                Text: Text
            }
        });
        return response;
    }
    this.BlockUser = function (ApiKey, SocketId) {
        var response = $http({
            method: "POST",
            url: "/Ip/BlockUser",
            params: {
                SocketId: SocketId
            }
        });
        return response;
    }
});