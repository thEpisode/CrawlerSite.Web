Flinger.controller("TreemapController", function ($scope, TreemapService) {

    $scope.MyArray = [];
    $scope.Site = {};
    $scope.UrlScreenshot = "";
    $scope.HeatmapData = [];
    $scope.DisableFilters = false;
    $scope.Filters =
        {
            MinWidth: 768,
            MaxWidth: 2000,
            Type: 'Movement',
            MaxTime: 12,
            Endpoint: ''
        };

    document.addEventListener("HeatmapTreeSelected", function () { $scope.HeatmapTreeSelected() }, false);


    $scope.HeatmapTreeSelected = function () {
        if ($Flinger.SiteMapPoint != undefined) {
            $Flinger.Loader.Init()
            
            // Navigate to Heatmap
            window.location.assign('/Insights/Heatmap?Id=' + $Flinger.QueryString().Id)
        }
    }

    $scope.InitializeView = function () {
        var SiteId = $Flinger.QueryString().Id;
        $(".heatmap-map").hide();

        if (SiteId != undefined && SiteId != null) {
            TreemapService.GetSiteById(SiteId)
                .then(function (response) {
                    $scope.Site = response.data.result;

                    $Flinger.SiteMap.loadJSON(response.data.result.Track);
                    $Flinger.SiteMobileMap.loadJSON(response.data.result.Track);
                    $Flinger.Loader.Finish()
                    //SiteMap.setConnector('diagonal');
                    //setConnector('diagonal');
                    //setConnector('elbow');
                    console.log('Site data:')
                    console.log(response.data.result.Track);
                },
                function (response) {
                    console.log(response);
                })
        }
    }

});