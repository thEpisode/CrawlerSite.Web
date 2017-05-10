Flinger.controller("DashboardController", function ($scope, DashboardService) {
    $scope.Insights = {};

    $scope.InitializeIndexView = function () {
        $scope.CheckIfUserHasNoPaymentData();
        $scope.GetUserById();

        DashboardService.GetInsights().then(function (response) {
            console.log(response.data)

            if (response.data.result != undefined && response.data.result != null) {
                if (response.data.success == true) {
                    $scope.processDashboardResults(response.data);
                    $Flinger.Loader.Finish();
                }
            }
            else {
                $Flinger.Toast.InfoWithButtons(response.data.message, 'Did you want create a new site?', [['<button>Yes!</button>', function (instance, toast) { location.assign('/Site/Add') }], ['<button>Not yet</button>', function (instance, toast) { instance.hide({ transitionOut: 'fadeOutUp' }, toast); }]])
                $Flinger.Loader.Finish();
            }
        },
            function (response) {
                console.log(response);
            })

    }

    $scope.processDashboardResults = function (data) {
        if (data.result.length > 0) {
            var result = {
                IsPageViewChart: false,
                IsUserOnlineChart: false,
                IsIssuesChart: false,
                IsRecordersChart: false,
                IsUserBehaviorChart: false,
                IsFormAnalysisChart: false,
                PageViewsPerMonth: 0,
                RATUsersOnline: 0,
                WebFormsIssues: 0,
                SecondsUsedPerMonth: 0,
                UsersBehavior: {}
            };
            data.result.forEach(function (item, index) {
                switch (item.message.toLowerCase()) {
                    case 'GetPageViewsHeatmapsByApiKeys'.toLowerCase():
                    case 'GetPageViewsHeatmapsByApiKey'.toLowerCase():
                        result.PageViewsPerMonth = item.result[0].TotalMonth;
                        result.IsPageViewChart = true;
                        break;
                    case 'GetRATUsersOnlineByApiKeys'.toLowerCase():
                    case 'GetRATUsersOnlineByApiKey'.toLowerCase():
                        result.RATUsersOnline = item.result[0].UsersOnline;
                        result.IsUserOnlineChart = true;
                        break;
                    case 'GetFormIssuesByApiKeys'.toLowerCase():
                    case 'GetFormIssuesByApiKey'.toLowerCase():
                        result.WebFormsIssues = item.result[0].IssuesPerMonth;
                        result.IsIssuesChart = true;
                        break;
                    case 'GetTotalSecondsRecordsByApiKey'.toLowerCase():
                    case 'GetTotalSecondsRecordsByApiKeys'.toLowerCase():
                        var total = item.result[0].TotalSecondsPerMonth / 60;
                        result.SecondsUsedPerMonth = Math.floor(total);
                        result.IsRecordersChart = true;
                        break;
                    case 'GetClientsBehaviorByApiKey'.toLowerCase():
                    case 'GetClientsBehaviorByApiKeys'.toLowerCase():
                        result.UsersBehavior = item.result[0];
                        result.IsUserBehaviorChart = true;
                        $scope.UpdateUsersBehaviorChart(result.UsersBehavior);
                        break;
                    default:
                        // Do something
                        break;
                }
            });

            $scope.Insights = result;
        }
    }

    $scope.UpdateUsersBehaviorChart = function (data) {
        var heatmapsData = [], ratData = [], formAnalysisData = [], recordsData = [];
        var maxValue = 0;

        for (var key in data.HeatmapsClientsBehavior[0]) {
            if (data.HeatmapsClientsBehavior[0].hasOwnProperty(key)) {
                heatmapsData.push(data.HeatmapsClientsBehavior[0][key]);
                if (data.HeatmapsClientsBehavior[0][key] > maxValue) maxValue = data.HeatmapsClientsBehavior[0][key];
            }
        }

        for (var key in data.RATClientsBehavior[0]) {
            if (data.RATClientsBehavior[0].hasOwnProperty(key)) {
                ratData.push(data.RATClientsBehavior[0][key]);
                if (data.HeatmapsClientsBehavior[0][key] > maxValue) maxValue = data.HeatmapsClientsBehavior[0][key];
            }
        }

        for (var key in data.FormAnalysisClientsBehavior[0]) {
            if (data.FormAnalysisClientsBehavior[0].hasOwnProperty(key)) {
                formAnalysisData.push(data.FormAnalysisClientsBehavior[0][key]);
                if (data.HeatmapsClientsBehavior[0][key] > maxValue) maxValue = data.HeatmapsClientsBehavior[0][key];
            }
        }

        for (var key in data.RecordsClientsBehavior[0]) {
            if (data.RecordsClientsBehavior[0].hasOwnProperty(key)) {
                recordsData.push(data.RecordsClientsBehavior[0][key]);
                if (data.HeatmapsClientsBehavior[0][key] > maxValue) maxValue = data.HeatmapsClientsBehavior[0][key];
            }
        }

        var dataSales = {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            series: [
                heatmapsData,
                ratData,
                formAnalysisData,
                recordsData,
            ]
        };

        var optionsSales = {
            lineSmooth: true,
            low: 0,
            high: maxValue,
            showArea: true,
            axisX: {
                showGrid: true,
                labelInterpolationFnc: function (value, index) {
                    return index % 3 === 0 ? value : null;
                }
            },
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 3
            }),
            showLine: true,
            showPoint: false,
        };

        var responsiveSales = [
            ['screen and (max-width: 640px)', {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 3 === 0 ? value : null;
                    }
                }
            }]
        ];

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
    }

    $scope.CheckIfUserHasNoPaymentData = function () {
        DashboardService.CheckIfHasNoPaymentMethodByUserId().then(function (response) {
            console.log(response.data);

            if (response.data.result != undefined && response.data.result != null) {
                if (response.data.success == true) {
                    if (response.data.result === false) {
                        $Flinger.Toast.WarningWithButtons('You haven\'t a valid payment method', 'Did you want add any?', [['<button>Yes!</button>', function (instance, toast) { location.assign('/Billing/') }], ['<button>Not yet</button>', function (instance, toast) { instance.hide({ transitionOut: 'fadeOutUp' }, toast); }]])
                    }
                }
            }
        })
    }

    $scope.GetUserById = function () {
        DashboardService.GetUserById().then(function (response) {
            console.log(response.data)

            if (response.data.result != undefined && response.data.result != null) {
                if (response.data.success == true) {
                    $Flinger.LoggedCrawling(response.data.result);
                }
            }
        })
    }
});