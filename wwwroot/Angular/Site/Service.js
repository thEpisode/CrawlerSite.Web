Flinger.service("SiteService", function ($http) {
    //CreateObj
    this.AddSite = function (UserId, Name, Url, Tags, State) {
        var response = $http({
            method: "post",
            url: "/Site/CreateSite",
            params: {
                UserId: UserId,
                Name: Name,
                Url: Url,
                Tags: Tags,
                State: State
            }
        });
        return response;
    }

    this.GetSiteByName = function(Name){
        var response = $http({
            method: "get",
            url: "/Site/GetSiteByName",
            params: {
                Name: Name
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

    this.GetSiteByApiKey = function(ApiKey){
        var response = $http({
            method: "get",
            url: "/Site/GetSiteByApiKey",
            params:{
                ApiKey: ApiKey
            }
        });

        return response;
    }

    //GetAllObj
    this.GetAllSite = function () {
        return $http.get("/Site/GetAllSite");
    };

    this.GetAllSitesByUserId = function(){
        //console.log(UserId)
        var response = $http({
            method: "get",
            url: "/Site/GetAllSitesByUserId",
            params: {
                UserId: $Flinger.ReadPersistentData('userId')
            }
        });
        return response;
    }

    this.AddUserToSite = function(SiteId, UserId){
        var response = $http({
            method: "get",
            url: "/Site/AddUserToSite",
            params: {
                SiteId: SiteId,
                UserId: UserId
            }
        });
        return response;
    }

    this.EditSite = function (id, Name, Url, Tags) {
        var response = $http({
            method: "post",
            url: "/Site/EditSite",
            params: {
                _id: id,
                Name: Name,
                Url: Url,
                Tags: Tags
            }
        });
        return response;
    }

    this.DeleteSite = function (id) {
        var response = $http({
            method: "post",
            url: "/Site/DeleteSite",
            params: {
                _id: id
            }
        });
        return response;
    }

});