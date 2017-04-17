Flinger.service("BillingService", function ($http) {
    this.GetUserById = function () {
        var response = $http({
            method: "get",
            url: "/User/GetUserById/",
            params: {
                UserId: $Flinger.ReadPersistentData('userId')
            }
        });
        return response;
    }

    this.SubscribeToPlan = function (planId, email, description, stripeToken, firstname, lastname) {
        var response = $http({
            method: "post",
            url: "/Billing/SubscribeToPlan/",
            params: {
                Plan: planId,
                Email: email,
                Description: description,
                StripeToken: stripeToken,
                Firstname: firstname,
                Lastname: lastname
            }
        });
        return response;
    }

    this.GetAllPlans = function(){
        var response = $http({
            method: "get",
            url: "/Billing/GetAllPlans/",
            params: { }
        });
        return response;
    }

    this.ChangePlan = function(plan){
        var response = $http({
            method: "post",
            url: "/Billing/ChangePlan",
            params: 
            {
                PlanId: plan,
                UserId: localStorage.getItem("userId")
            }
        });
        return response;
    }
    
    this.GetCustomerByUserId = function (userId) {
        var response = $http({
            method: "post",
            url: "/Billing/GetCustomerByUserId/",
            params: {
                UserId: localStorage.getItem("userId"),
            }
        });
        return response;
    }

    this.GetChargesByUserId = function(){
        var response = $http({
            method: "post",
            url: "/Billing/GetChargesByUserId/",
            params: {
                UserId: localStorage.getItem("userId")
            }
        });
        return response;
    }
});