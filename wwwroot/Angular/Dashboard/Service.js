Flinger.service("DashboardService", function ($http) {
    this.GetInsights = function(){
        var response = $http({
            method: "get",
            url: "/Dashboard/GetInsights/",
            params: {
                UserId: $Flinger.ReadPersistentData('userId')
            }
        });
        return response;
    };

    this.CheckIfHasNoPaymentMethodByUserId = function(){
        var response = $http({
            method: 'post',
            url: '/User/CheckIfHasNoPaymentMethodByUserId/',
            params:{
                UserId: $Flinger.ReadPersistentData('userId')
            }
        });
        return response;
    }
});