Flinger.controller("IpController", function ($scope, $timeout, IpService, SiteService) {

    $scope.Ips = [];
    $scope.Sites = [];
    $scope.Ip = {};
    $scope.Site = {};
    $scope.siteOption = "";
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';     // set the default search/filter term
    $scope.PrivateIPs = '';
    $scope.BlockAllSubnetwork = true;

    $scope.InitializeIndexView = function () {

        SiteService.GetAllSitesByUserId(localStorage.getItem("userId")).then(function (response) {
            console.log(response.data)

            if (response.data.success == true) {

                $scope.Sites = response.data.result;
                $scope.siteOption = $scope.Sites[0];
                $Flinger.Loader.Finish();

                if (response.data.result.length > 0) {
                    IpService.GetIpByApiKey(response.data.result[0].ApiKey).then(function (response) {
                        console.log(response.data)
                        if (response.data.success) {
                            $scope.Ips = response.data.result;
                        }
                    })
                }
            }


        },
            function (response) {
                console.log(response);
                $Flinger.Loader.Finish()
            });
    }

    $scope.InitializeAddView = function () {

        SiteService.GetAllSitesByUserId(localStorage.getItem("userId")).then(function (response) {
            console.log(response.data)

            response.data.result.unshift({ ApiKey: 0, Name: 'Please selecte one site' });
            $scope.Sites = response.data.result;

            $scope.siteOption = $scope.Sites[0];
            $Flinger.Loader.Finish()
        },
            function (response) {
                console.log(response);

            })
    }

    $scope.InitializeEditView = function () {
        var IpId = $Flinger.QueryString().Id;

        if (IpId != undefined && IpId != null) {
            IpService.GetIpById(IpId)
                .then(function (response) {
                    $scope.Ip = response.data.result;

                    console.log('Ip Data:')
                    console.log(response.data.result);
                    SiteService.GetSiteByApiKey($scope.Ip.ApiKey).then(function (response) {
                        console.log('Site Data:');
                        console.log(response.data.result);

                        $scope.Site = response.data.result;

                        $timeout(function () {
                            $scope.Ip.PrivateIPs.forEach(function (ip, index) {
                                $('#PrivateIPs').tagsinput('add', ip);
                            });
                            $Flinger.Loader.Finish();
                        }, 500);
                    })
                },
                function (response) {
                    console.log(response);
                    $Flinger.Loader.Finish()
                })
        }
    }

    $scope.InitializeDeleteView = function () {
        var IpId = $Flinger.QueryString().Id;

        if (IpId != undefined && IpId != null) {
            IpService.GetIpById(IpId)
                .then(function (response) {
                    $scope.Ip = response.data.result;
                    $Flinger.Loader.Finish();
                    console.log(response.data.result);
                },
                function (response) {
                    console.log(response);
                    $Flinger.Loader.Finish()
                })
        }
    }

    $scope.AddIp = function () {
        $Flinger.Loader.Init();
        var selectedSite = $scope.siteOption;

        var privateIps = [];

        if ($scope.BlockAllSubnetwork == false) {
            $scope.PrivateIPs.split(',').forEach(function (ip, index) {
                privateIps.push(ip.trim());
            });
        }
        else{
            privateIps.push(`192.168.0.*`);
        }

        IpService.CreateIp({
            ApiKey: selectedSite.ApiKey,
            PublicIP: $scope.Site.PublicIP,
            PrivateIPs: privateIps,
            Name: $scope.Site.Name,
            State: 1
        })
            .then(function (response) {
                console.log(response)
                if (response.data != undefined && response.data != null) {
                    // Added succesfully
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

    $scope.EditIp = function () {
        $Flinger.Loader.Init();
        var privateIps = [];

        $scope.PrivateIPs.split(',').forEach(function (ip, index) {
            privateIps.push(ip.trim());
        });
        IpService.EditIp({
            Id: $scope.Ip._id,
            PublicIP: $scope.Ip.PublicIP,
            PrivateIPs: PrivateIPs,
            Name: $scope.Ip.Name,
        }).then(function (response) {
            console.log(response)
            if (response.data != undefined && response.data != null) {
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

    $scope.DeleteIp = function () {
        $Flinger.Loader.Init();

        IpService.DeleteIp({ Id: $scope.Ip._id }).then(function (response) {
            console.log(response)
            if (response.data != undefined && response.data != null) {
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
            })
    }

    $scope.OnSiteSelected = function () {
        $Flinger.Loader.Init();
        var selectedSite = $scope.siteOption;

        IpService.GetIpByApiKey(selectedSite.ApiKey).then(function (response) {
            console.log(response.data)
            if (response.data.success) {
                $scope.Ips = response.data.result;

                $Flinger.Loader.Finish();
            }
        })
    }
});