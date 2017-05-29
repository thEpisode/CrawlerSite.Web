Flinger.service("InsightsService", function ($http) {
    this.VoteByFeature = function (feature) {
        var response = $http({
            method: "post",
            url: "/Vote/CreateVote/",
            params: {
                Feature: feature,
                UserId: $Flinger.ReadPersistentData('userId')
            }
        });
        return response;
    }


});