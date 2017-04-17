Flinger.service("RATService", function ($http) {
    this.GetSocketUrl = function(Id){
        var response = $http({
            method: "get",
            url: "/Insights/GetSocketUrl",
            params: {
                
            }
        });
        return response;
    }

    this.GetSiteById = function(Id){
        var response = $http({
            method: "get",
            url: "/Site/GetSiteById",
            params: {
                Id: Id
            }
        });
        return response;
    }
});