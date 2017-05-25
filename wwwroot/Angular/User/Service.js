Flinger.service("UserService", function ($http) {
    //CreateObj
    this.CreateUser = function (FirstName, LastName, Email, Country, City, Site) {
        var response = $http({
            method: "post",
            url: "/User/CreateUser",
            params: {
                
                FirstName: FirstName,
                LastName: LastName,
                Email: Email,
                Country: Country,
                City: City,
                Site: Site,
                Password: '92/L33[(%5EH?wA',
                State: 4 // Invited
            }
        });
        return response;
    }

    this.GetUserByEmail = function(Email){
        var response = $http({
            method: "get",
            url: "/User/GetUserByEmail",
            params: {
                Email: Email
            }
        });
        return response;
    }

    this.GetUserById = function(Id){
        var response = $http({
            method: "get",
            url: "/User/GetUserById",
            params: {
                UserId: Id
            }
        });
        return response;
    }

    //GetAllObj
    this.GetAllUser = function () {
        var response = $http({
            method: "get",
            url: "/User/GetAllUserOfSubscriptionByUserId",
            params: {
                UserId: $Flinger.ReadPersistentData('userId')
            }
        });
        return response;
    };

    this.EditUser = function (data) {
        var response = $http({
            method: "post",
            url: "/User/EditUser",
            params: {
                _id: data._id,
                FirstName: data.FirstName,
                LastName: data.LastName,
                Email: data.Email,
                City: data.City,
                Country: data.Country,
            }
        });
        return response;
    }

    this.DeleteUser = function (id) {
        var response = $http({
            method: "post",
            url: "/User/DeleteUser",
            params: {
                _id: id
            }
        });
        return response;
    }

    this.LogOut = function(){
        localStorage.removeItem('auth_token');
        location.assign('/');
    }
});