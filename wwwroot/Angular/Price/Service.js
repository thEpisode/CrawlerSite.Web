Flinger.service("PriceService", function ($http) {
    //CreateObj
    this.CreatePrice = function (Feature, Price, Type, Description, State) {
        var response = $http({
            method: "post",
            url: "/Price/CreatePrice",
            params: {
                Feature: Feature,
				Price: Price,
				Type: Type,
				Description: Description,
				State: State
            }
        });
        return response;
    }
    
    this.GetPriceByFeature = function(Feature){
        var response = $http({
            method: "get",
            url: "/Price/GetPriceByFeature",
            params: {
                Feature: Feature
            }
        });
        return response;
    }

    this.GetPriceById = function(Id){
        var response = $http({
            method: "get",
            url: "/Price/GetPriceById",
            params: {
                Id: Id
            }
        });
        return response;
    }

    //GetAllObj
    this.GetAllPrice = function () {
        return $http.get("/Price/GetAllPrice");
    };

});