Flinger.controller("SiteController", function ($scope, SiteService) {

    $scope.Sites = [];
    $scope.Site = {};
    $scope.CodeResult = "Building your site...";
    $scope.ApiKeyResult = "Building your site...";

    $scope.InitializeIndexView = function () {

        SiteService.GetAllSitesByUserId().then(function (response) {
            console.log(response.data)

            if (response.data.success != undefined) {
                if (response.data.success == false) {
                    $Flinger.Dialog.SetData("Oops, some errors", response.data.message);
                }
                else {
                    $scope.Sites = response.data.result;
                    $Flinger.Loader.Finish();
                }
            }
        },
            function (response) {
                console.log('error');
                console.log(response);
            })
    }

    $scope.InitializeAddView = function () {
        $Flinger.Loader.Finish()
    }

    $scope.InitializeEditView = function () {
        var SiteId = $Flinger.QueryString().Id;

        if (SiteId != undefined && SiteId != null) {
            var getSiteProcess = SiteService.GetSiteById(SiteId);

            getSiteProcess.then(function (response) {
                $scope.Site = response.data.result;
                $Flinger.Loader.Finish();
                //console.log(response.data);
            },
                function (response) {
                    console.log(response);
                })
        }
    }

    $scope.InitializeDeleteView = function () {
        var SiteId = $Flinger.QueryString().Id;

        if (SiteId != undefined && SiteId != null) {
            var getSiteProcess = SiteService.GetSiteById(SiteId);

            getSiteProcess.then(function (response) {
                $scope.Site = response.data.result;
                $Flinger.Loader.Finish();
                console.log(response.data);
            },
                function (response) {
                    console.log(response);
                })
        }
    }

    $scope.InitializePreviewView = function(){
        var SiteId = $Flinger.QueryString().Id;

        if (SiteId != undefined && SiteId != null) {
            var getSiteProcess = SiteService.GetSiteById(SiteId);

            getSiteProcess.then(function (response) {
                $scope.Site = response.data.result;
                $Flinger.Loader.Finish();
                console.log(response.data);
            },
                function (response) {
                    console.log(response);
                })
        }
    }

    $scope.EditSite = function () {
        var editSiteProcess = SiteService.EditSite(
            $scope.Site._id,
            $scope.Site.Name,
            $scope.Site.Url,
            $scope.Site.Tags);

        editSiteProcess.then(function (response) {
            console.log(response)
            if (response.data.result == true) {
                // edit succesfully
                window.location.reload();
            }
            else {
                // can't edit 
                console.log(response);
            }
        },
            function (response) {
                console.log(response);
            });
    }

    $scope.DeleteSite = function () {
        var deleteSiteProcess = SiteService.DeleteSite($scope.Site._id);

        deleteSiteProcess.then(function (response) {
            console.log(response)
            if (response.data.result == true) {
                // edit succesfully
                $Flinger.GoTo.ControllerIndex();
            }
            else {
                // can't edit 
                console.log(response);
            }
        },
            function (response) {
                console.log(response);
            });
    }

    $scope.AddSite = function () {
        var tags = [];

        $scope.Site.Tags.split(',').forEach(function (tag, index) {
            tags.push(tag.trim());
        });

        var addSiteProcess = SiteService.AddSite(
            $Flinger.ReadPersistentData('userId'),
            $scope.Site.Name,
            $scope.Site.Url,
            tags,
            2);

        addSiteProcess.then(function (response) {

            console.log(response);
            if (response.data.result != undefined && response.data.result != null) {
                $scope.CodeResult = '<script src="//crawlersite-kernel.azurewebsites.net/build/flinger.min.js" data-flinger="' + response.data.result.ApiKey + '"></script>';
                $scope.ApiKeyResult = response.data.result.ApiKey;
            }
            else {
                // can't edit 
                console.log(response);
            }
        },
            function (response) {
                console.log(response);
            });
    }

    $scope.setIcon = function (url) {
        return url + "/apple-touch-icon.png";
    }
});