Flinger.controller("HeatmapController", function ($scope, HeatmapService) {

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
            Endpoint: '',
            Flash: null,
            Browser: null,
            OperatingSystem: null,
            Cookies: null,
            Location: null
        };
    $scope.screenShotIsLoaded = false;
    $scope.heatmapIsLoaded = false;
    $scope.Endpoint = "";

    $scope.SetLocation = function(location){
        $Flinger.Loader.Init();
        $scope.Filters.Location = location;
        $scope.GetInsights();
    }

    $scope.SetCookies = function(cookies){
        $Flinger.Loader.Init();
        $scope.Filters.Cookies = cookies;
        $scope.GetInsights();
    }

    $scope.SetOperatingSystem = function(so){
        $Flinger.Loader.Init();
        $scope.Filters.OperatingSystem = so;
        $scope.GetInsights();
    }

    $scope.SetBrowser = function(browser){
        $Flinger.Loader.Init();
        $scope.Filters.Browser = browser;
        $scope.GetInsights();
    }

    $scope.SetFlash = function(flash){
        $Flinger.Loader.Init();
        $scope.Filters.Flash = flash;
        $scope.GetInsights();
    }

    $scope.SetMaxTime = function (time) {
        $Flinger.Loader.Init();
        $scope.Filters.MaxTime = time;
        $scope.GetInsights();
    }

    $scope.ScreenShotIsLoaded = function () {
        $scope.screenShotIsLoaded = true;
        $scope.SetDataInHeatmap();
    }

    $scope.SetSize = function (device) {
        $Flinger.Loader.Init();
        switch (device.toLowerCase()) {
            case 'desktop':
                $scope.Filters.MinWidth = 1024;
                $scope.Filters.MaxWidth = 3000;
                break;
            case 'tablet':
                $scope.Filters.MinWidth = 700;
                $scope.Filters.MaxWidth = 1024;
                break;
            case 'mobile':
                $scope.Filters.MinWidth = 0;
                $scope.Filters.MaxWidth = 700;
                break;
            default:
                $scope.Filters.MinWidth = 1024;
                $scope.Filters.MaxWidth = 3000;
                break;
        }
        $scope.GetInsights();
    }

    $scope.SetType = function (type) {
        $Flinger.Loader.Init();
        switch (type.toLowerCase()) {
            case 'movement':
                $scope.Filters.Type = 'Movement';
                break;
            case 'click':
                $scope.Filters.Type = 'Click';
                break;
            case 'scroll':
                $scope.Filters.Type = 'Scroll';
                break;
            default:
                $scope.Filters.Type = 'Movement';
                break;
        }
        $scope.GetInsights();
    }

    $scope.Export = function (option) {

    }

    $scope.GetInsights = function () {
        $scope.DisableFilters = true;
        if ($Flinger.SiteMapPoint.Name === undefined) {
            $Flinger.SiteMapPoint = JSON.parse($Flinger.ReadPersistentData('SiteMapPoint'));
            $Flinger.RemovePersistentData('SiteMapPoint');

        }

        if ($Flinger.SiteMapPoint == null) {
            window.history.back();
        }
        HeatmapService.GetSiteScreenshotUrl($Flinger.SiteMapPoint.Screenshot)
            .then(function (response) {
                console.log(response);
                $scope.UrlScreenshot = response.data;

                $scope.Endpoint = '/' + $Flinger.SiteMapPoint.Name;
            },
            function (response) {
                console.log(response);
            })

        //http://localhost:3500/api/Insights/HeatmapData/ApiKey/409277fb/MinWidth/768/MaxWidth/2000/Type/Movement/MaxTime/168/Endpoint/Index
        HeatmapService.GetSiteHeatmapData(
            $scope.Site.ApiKey,
            $scope.Filters.MinWidth,
            $scope.Filters.MaxWidth,
            $scope.Filters.Type,
            $scope.Filters.MaxTime,
            $scope.Filters.Flash,
            $scope.Filters.Browser,
            $scope.Filters.OperatingSystem,
            $scope.Filters.Cookies,
            $scope.Filters.Location,
            $Flinger.SiteMapPoint.Name)
            .then(function (response) {
                console.log("Data:")
                console.log(response.data);

                if (response.data != undefined) {
                    if (response.data.success != undefined && response.data.success != null) {
                        if (response.data.success == true) {
                            if (response.data.result.length > 0) {
                                $scope.DisableFilters = false;

                                $scope.HeatmapData = response.data.result;
                                $scope.heatmapIsLoaded = true;
                                $scope.SetDataInHeatmap();
                                //SiteMap.setConnector('diagonal');
                                //setConnector('diagonal');
                                //setConnector('elbow');
                                //console.log(response.data);
                            }
                            else {
                                $Flinger.Loader.Finish();
                                $Flinger.Dialog.SetData("Information", "In this moment we have data for providen parameters, try another configuration or wait for your user interactions");
                                $scope.DisableFilters = false;
                            }
                        }
                        else {
                            $Flinger.Loader.Finish();
                            $Flinger.Dialog.SetData("Error", response.data.message);
                        }
                    }
                }
            },
            function (response) {
                console.log(response);
            })
    }

    $scope.SetDataInHeatmap = function () {
        if ($scope.screenShotIsLoaded === true && $scope.heatmapIsLoaded === true) {

            try {
                destroyHeatmap();
            } catch (e) { }

            /// Set real size
            var heatmapScreenshot = document.querySelector('.heatmap-screenshot');
            $("#heatmapContainer").css("width", heatmapScreenshot.clientWidth + ("px"))
            $("#heatmapContainer").css("height", heatmapScreenshot.clientHeight + ("px"))

            createHeatmap();

            heatmap.addData($scope.HeatmapData);
            $Flinger.Loader.Finish();

            /// Set screen size
            $("#heatmapContainer").removeAttr("style");

            $('.heatmap-screenshot').addClass("img-responsive");
            $('.heatmap-canvas').css('width', '100%')
        }



    }


    $scope.InitializeView = function () {
        var SiteId = $Flinger.QueryString().Id;
        //$(".heatmap-map").hide();

        if (SiteId != undefined && SiteId != null) {
            HeatmapService.GetSiteById(SiteId)
                .then(function (response) {
                    $scope.Site = response.data.result;

                    //SiteMap.setConnector('diagonal');
                    //setConnector('diagonal');
                    //setConnector('elbow');
                    console.log('Site data:')
                    console.log(response.data);

                    $scope.GetInsights();

                    //$scope.Site.Name = $Flinger.SiteMapPoint.Name
                },
                function (response) {
                    console.log(response);
                })
        }
    }

});