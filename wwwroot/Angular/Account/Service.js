Flinger.service("AccountService", function ($http) {
    this.GetUserById = function(){
        var response = $http({
            method: "get",
            url: "/User/GetUserById/",
            params: {
                UserId: $Flinger.ReadPersistentData('userId')
            }
        });
        return response;
    }

    this.ChangePasswordByUserId = function(data){
        var response = $http({
            method: 'POST',
            url: '/Account/ChangePasswordByUserId',
            params:{
                UserId: $Flinger.ReadPersistentData('userId'),
                OldPassword: data.Old,
                NewPassword: data.ConfirmNew
            }
        });
        return response;
    }

    this.DeleteAccountByUserId = function(){
        var response = $http({
            method: 'POST',
            url: '/Account/DeleteAccountByUserId',
            params:{
                UserId: $Flinger.ReadPersistentData('userId')
            }
        });
        return response;
    }
});