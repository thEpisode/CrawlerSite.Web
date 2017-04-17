Flinger.service("NotificationService", function ($http) {
    //CreateObj
    this.CreateNotification = function (UserId, ShortMessage, LongMessage, Uri, Type, State) {
        var response = $http({
            method: "post",
            url: "/Notification/CreateNotification",
            params: {
                UserId: UserId,
				ShortMessage: ShortMessage,
				LongMessage: LongMessage,
				Uri: Uri,
				Type: Type,
				State: State,
            }
        });
        return response;
    }

    this.GetNotificationsByUserId = function(){
        var response = $http({
            method: "get",
            url: "/Notification/GetNotificationsByUserId",
            params: {
                UserId: localStorage.getItem("userId")
            }
        });
        return response;
    }

    this.GetNotificationById = function(NotificationId){
        var response = $http({
            method: "get",
            url: "/Notification/GetNotificationById",
            params: {
                Id: NotificationId
            }
        });
        return response;
    }

    //GetAllObj
    this.GetAllNotification = function () {
        return $http.get("/Notification/GetAllNotification");
    };

});