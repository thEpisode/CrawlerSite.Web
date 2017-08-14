Flinger.service("HeatmapService", function ($http) {
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

    this.GetSiteScreenshot = function(Id){
        var response = $http({
            method: "get",
            url: "/Insights/GetSiteScreenshot",
            params: {
                Id: Id
            }
        });
        return response;
    }

    this.GetSiteHeatmapData = function(ApiKey, MinWidth, MaxWidth, Type, MaxTime, Flash, Browser, OperatingSystem, Cookies, Location, Endpoint){
        var response = $http({
            method: "get",
            url: "/Insights/GetSiteHeatmapData",
            params: {
                ApiKey: ApiKey,
                MinWidth:MinWidth,
                MaxWidth:MaxWidth,
                Type:Type,
                MaxTime:MaxTime,
                Flash: Flash,
                Browser: Browser,
                OperatingSystem: OperatingSystem,
                Cookies: Cookies,
                Location: Location,
                Endpoint, Endpoint
            }
        });
        return response;
    }
});