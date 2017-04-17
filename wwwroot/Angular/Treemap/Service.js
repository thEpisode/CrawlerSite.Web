Flinger.service("TreemapService", function ($http) {
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

    this.GetSiteScreenshotUrl = function(Id){
        var response = $http({
            method: "get",
            url: "/Insights/GetSiteScreenshotUrl",
            params: {
                Id: Id
            }
        });
        return response;
    }

    this.GetSiteHeatmapData = function(ApiKey, MinWidth, MaxWidth, Type, MaxTime, Endpoint){
        var response = $http({
            method: "get",
            url: "/Insights/GetSiteHeatmapData",
            params: {
                ApiKey: ApiKey,
                MinWidth:MinWidth,
                MaxWidth:MaxWidth,
                Type:Type,
                MaxTime:MaxTime,
                Endpoint, Endpoint
            }
        });
        return response;
    }
});