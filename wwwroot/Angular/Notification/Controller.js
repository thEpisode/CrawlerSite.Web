Flinger.controller("NotificationController", function ($scope, NotificationService) {

    $scope.Notifications = [];
    $scope.Notification = {};
    $scope.NoNotifications = false;

    $scope.InitializeIndexView = function () {
        NotificationService.GetNotificationsByUserId().then(function (response) {
            //console.log(response.data)

            $scope.Notifications = response.data.result;
            $scope.hideLoaderNotificationView();
            //$Flinger.Loader.Finish();
        },
            function (response) {
                console.log(response);
            })
    }

    $scope.InitializeNotificationBar = function () {
        NotificationService.GetNotificationsByUserId().then(function (response) {
            //console.log(response.data)

            $scope.Notifications = response.data.result;

            if ($scope.Notifications != null && $scope.Notifications.length > 0) {
                $scope.NoNotifications = false;
            }
            else {
                $scope.NoNotifications = true;
            }
        },
            function (response) {
                console.log(response);
            })
    }

    $scope.InitializeDetailView = function () {
        var NotificationId = $Flinger.QueryString().Id;

        NotificationService.GetNotificationById(NotificationId).then(function (response) {
            //console.log(response)
            if (response.data.success == true) {
                $scope.Notification = response.data.result;
            }
            $Flinger.Loader.Finish();
        },
            function (response) {
                console.log(response);
            })
    }

    $scope.hideLoaderNotificationView = function () {
        $Flinger.Loader.Finish();
    }
});

Flinger.directive("notificationView", function () {
    return {
        restrict: "A",
        link: function ($scope, elem, attrs) {
            if ("notification-view" in attrs) {
                $scope.hideLoaderNotificationView();
            }
        }
    }
});