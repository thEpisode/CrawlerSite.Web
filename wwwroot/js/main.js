var $Flinger = {};

$Flinger.Logs = '';
$Flinger.Version = '1.0.0.0';

$Flinger.Log = function () {
    var oldLog = console.log;
    console.log = function (message) {
        $Flinger.Logs += '> ' + (typeof message != 'string' ? JSON.stringify(message) : message) + '\n';
        oldLog.apply(console, arguments);
    };

    window.onerror = function (message, url, linenumber) {
        console.log("JavaScript error: " + message + " on line " + linenumber + " for " + url);
    }
}

$Flinger.Log();

$Flinger.LogOut = function () {
    localStorage.clear();
    location.assign('/');
}

/// Used for get values from Query String
/// http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter#answer-979995
$Flinger.QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
};

$Flinger.RemoveParam = function (key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    if ($Flinger.QueryString().AuthToken !== undefined) {
        history.replaceState(null, "Dashboard", "Dashboard");
    }
}

$Flinger.SearchObjectByIdOnArray = function (nameKey, _array) {
    for (var i = 0; i < _array.length; i++) {
        if (_array[i].Id === nameKey) {
            return _array[i];
        }
    }
    return null;
}

$Flinger.AddPersistentData = function (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

$Flinger.ReadPersistentData = function (key) {
    return localStorage.getItem(key);
}

$Flinger.RemovePersistentData = function (key) {
    localStorage.removeItem(key);
}

$Flinger.GetEntryPath = function () {
    return location.href;
}

$Flinger.LoggedCrawling = function (user) {
    if (user.HasCouponCode !== undefined && user.HasCouponCode !== null) {
        if (user.HasCouponCode === true) {
            angular.element(document.querySelector('#redeem')).scope().ValidateVoucher();
            $Flinger.Dialog.SetData(
                "Invitation code:",
                '<div class="input-group"><input id="invition-code-register" placeholder="Insert here" class="input-voucher form-control invition-code-register" type="text" minlength="13" maxlength="13" onkeyup="$Flinger.preventKeys(this)" onkeydown="$Flinger.alertToType(event)"><span class="input-group-addon input-group-addon-check"><i class="fa fa-check" aria-hidden="true"></i></span><span class="input-group-addon input-group-addon-error"><i class="fa fa-times" aria-hidden="true"></i></span></div>',
                [{
                    text: 'REDEEM',
                    className: $Flinger.Dialog.GetAcceptButtonStyle(),
                    callback: function () {
                        angular.element(document.querySelector('#redeem')).scope().RedeemVoucherCode();
                    }
                }, {
                    text: 'CANCEL',
                    className: $Flinger.Dialog.GetCancelButtonStyle()
                }]);
            angular.element(document.querySelector('#redeem')).scope().InitBox();
        }
        else {
            var random = Math.floor((Math.random() * 10) + 1);
            if (random <= 5) {
                /*$Flinger.Dialog.SetData(
                    "We are on beta!",
                    "Obtain premium discounts, t-shirts, early access and more...",
                    [{
                        text: 'I WANT IT',
                        className: $Flinger.Dialog.GetAcceptButtonStyle(),
                        callback: function () {
                            window.open('https://www.kickstarter.com')
                        }
                    }, {
                        text: 'NO, THANKS',
                        className: $Flinger.Dialog.GetCancelButtonStyle()
                    }]);*/
            }
        }
    }
}

$Flinger.preventKeys = function (e) {
    document.querySelector('#' + e.id).value = '';
    return false;
}

$Flinger.alertToType = function (e) {
    var map = {};
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    console.log(map)
    if (!map[86] && !map[17]) { // CTRL + V
        if ($Flinger.Dialog.IsOpen()) {
            $("#invition-code-register").tooltip({
                trigger: 'manual',
                animate: false,
                placement: 'bottom',
                title: 'Please copy voucher code from your email'
            });
            $("#invition-code-register").tooltip('show');
        }
        else {
            $Flinger.Dialog.SetData("Ooops!", "Please copy voucher code from your email");
        }
    }
}