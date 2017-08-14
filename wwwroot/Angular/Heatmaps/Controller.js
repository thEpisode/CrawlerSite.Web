Flinger.controller("HeatmapController", function ($scope, HeatmapService) {

    $scope.MyArray = [];
    $scope.Site = {};
    $scope.UrlScreenshot = "";
    $scope.Screenshot = {};
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
    $scope._iframe = null;

    $scope.SetLocation = function (location) {
        $Flinger.Loader.Init();
        $scope.Filters.Location = location;
        $scope.GetInsights();
    }

    $scope.SetCookies = function (cookies) {
        $Flinger.Loader.Init();
        $scope.Filters.Cookies = cookies;
        $scope.GetInsights();
    }

    $scope.SetOperatingSystem = function (so) {
        $Flinger.Loader.Init();
        $scope.Filters.OperatingSystem = so;
        $scope.GetInsights();
    }

    $scope.SetBrowser = function (browser) {
        $Flinger.Loader.Init();
        $scope.Filters.Browser = browser;
        $scope.GetInsights();
    }

    $scope.SetFlash = function (flash) {
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
        HeatmapService.GetSiteScreenshot($Flinger.SiteMapPoint.Screenshot)
            .then(function (response) {
                console.log('GetSiteScreenshot');
                console.log(response.data.result);
                $scope.Screenshot = response.data.result;
                $scope.PrintFrame();
                //$scope.UrlScreenshot = response.data;

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

    $scope.PrintFrame = function (data) {
        /**
         * Preserving aspect radio
         */
        var browserSize = {};
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        browserSize.width = x;
        browserSize.height = y;
        //document.querySelector('#frame-container').innerHTML = '';

        var currentFrameIdx = 0;
        var framesContainer = document.querySelector('#frame-container');
        var eventHandler = document.querySelector('.event-handler');

        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        }

        var blob = b64toBlob($scope.Screenshot.Screenshot, 'text/html');

        var iframeVisorWidthBorder = browserSize.width - 20;
        var iframeVisorHeightBorder = browserSize.height - 20;
        var originalWidthSize = $scope.Screenshot.DocumentSize.width;
        var originalHeightSize = $scope.Screenshot.DocumentSize.height;
        var widthAverage = iframeVisorWidthBorder / originalWidthSize;
        var heightAverage = iframeVisorHeightBorder / originalHeightSize;

        var iframeScale = Math.min(1, Math.min(widthAverage, heightAverage)); console.log(iframeScale);
        var iframeScaleCSS = "scale(" + iframeScale + "," + iframeScale + ")";
        var iframeWidthRate = $scope.Screenshot.DocumentSize.width * iframeScale;
        var iframeHeightRate = $scope.Screenshot.DocumentSize.height * iframeScale;
        var iframeMarginLeft = Math.min(Math.round((iframeVisorWidthBorder - iframeWidthRate) / 2) + 10, 10);
        var iframeMarginTop = Math.min(Math.round((iframeVisorHeightBorder - iframeHeightRate) / 2) + 10, 10);

        /// Creating iframe
        $scope._iframe = document.createElement('iframe');
        /// Rendering content
        $scope._iframe.src = window.URL.createObjectURL(blob);
        /// Setting Dimensions
        $scope._iframe.setAttribute("width", Math.round(iframeWidthRate) + "px");
        $scope._iframe.setAttribute("height", Math.round(iframeHeightRate) + "px");
        $scope._iframe.style.width = Math.round($scope.Screenshot.DocumentSize.width) + "px";
        $scope._iframe.style.height = Math.round($scope.Screenshot.DocumentSize.height) + "px";

        /// Setting Scale
        $scope._iframe.style.webkitTransform = iframeScaleCSS;
        $scope._iframe.style.transform = iframeScaleCSS;
        $scope._iframe.style.OTransform = iframeScaleCSS;
        $scope._iframe.style.MozTransform = iframeScaleCSS;
        $scope._iframe.style.msTransform = iframeScaleCSS;
        $scope._iframe.style.transformOrigin = "0 0";
        $scope._iframe.style.display = "block";

        /// Setting Frames Container
        framesContainer.style.marginTop = iframeMarginTop + "px";
        framesContainer.style.marginLeft = iframeMarginLeft + "px";
        framesContainer.style.width = Math.round(iframeWidthRate) + "px";
        framesContainer.style.height = Math.round(iframeHeightRate) + "px";

        /// Setting Event Handler
        eventHandler.style.marginTop = "75px";
        //eventHandler.style.marginTop = iframeMarginTop + "px";
        eventHandler.style.marginLeft = iframeMarginLeft + "px";
        eventHandler.style.width = Math.round(iframeWidthRate) + "px";
        eventHandler.style.height = Math.round(iframeHeightRate) + "px";

        //// End Preserving aspect ratio
        $scope._iframe.hidden = true;
        $scope._iframe.id = "rat-iframe"
        $scope._iframe.onload = function () {
            if (framesContainer.children.length) {
                var frame = framesContainer.children[currentFrameIdx];

                if (!frame) {
                    return;
                }

                if (currentFrameIdx > 0) {
                    var prevFrame = frame.previousElementSibling;
                    prevFrame.hidden = true;
                    window.URL.revokeObjectURL(prevFrame.src);
                }

                frame.hidden = false;

                currentFrameIdx++;
            }

        };

        // Force the iframe content to load by appending to the DOM.
        if (document.querySelector('#rat-iframe') !== null) {
            document.querySelector('#rat-iframe').parentNode.replaceChild($scope._iframe, document.querySelector('#rat-iframe'));
        }
        else {
            //document.querySelector('#frame-container').innerHTML = '';
            framesContainer.appendChild($scope._iframe);
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