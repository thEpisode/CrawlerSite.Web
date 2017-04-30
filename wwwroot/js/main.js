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

$Flinger.LoggedCrawling= function (user) {
    if(user.HasInvitationCode !== undefined && user.HasInvitationCode !== null){
         if(user.HasInvitationCode === true){
            $Flinger.Dialog.SetData("Invitation code:", "<input placeholder='Insert here' class='input-voucher form-control' type='text' autofocus />", "Redeem");
            $Flinger.Dialog.Toggle();
         }
    }
}