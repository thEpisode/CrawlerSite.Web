$Flinger.PathHandler = {
    _routes: [
        { PathName: 'home', VirtualPaths: ['/Dashboard*'] },
        { PathName: 'add-site', VirtualPaths: ['/Site/Add*'] },
        { PathName: 'site', VirtualPaths: ['/Site*'] },
        { PathName: 'site', VirtualPaths: ['/Insights*'] },
        { PathName: 'user', VirtualPaths: ['/User*'] },
        { PathName: 'ip', VirtualPaths: ['/Ip*'] },
        { PathName: 'billing', VirtualPaths: ['/Billing*'] },
        { PathName: 'Notification', VirtualPaths: ['/Notification*']},
        { PathName: 'Account', VirtualPaths: ['/Account/Detail*']},
    ],
    searchRoute: function (menu) {
        var index = 0;
        var found = false;
        for (var i = 0; i < menu.length; i++) {
            for (var j = 0; j < menu[i].VirtualPaths.length; j++) {
                if (menu[i].VirtualPaths[j].includes('*')) {
                    if (menu[i].VirtualPaths[j].substring(0, menu[i].VirtualPaths[j].indexOf('*')) == this.getLocation().substring(0, menu[i].VirtualPaths[j].indexOf('*'))) {
                        found = true;
                        break;
                    }
                }
                else if (menu[i].VirtualPaths[j] === this.getLocation()) {
                    found = true;
                    break;
                }
            }
            if (found) return menu[index];
            index++;
        };
        return null;
    },
    getLocation: function () {
        return window.location.pathname;
    },
    cleanNavigation: function () {
        $('.navigation-handler>li').removeClass('active')
    },
    setItemMenu: function (path) {
        if (path !== null) {
            var setMenu = false;
            switch (path) {
                case 'home':
                    $('li[data-path="home"]').addClass('active');
                    if (!this.checkCredentials()) { $Flinger.LogOut() }
                    setMenu = true;
                    break;
                case 'add-site':
                    $('li[data-path="add-site"]').addClass('active');
                    if (!this.checkCredentials()) { $Flinger.LogOut() }
                    setMenu = true;
                    break;
                case 'site':
                    $('li[data-path="site"]').addClass('active');
                    if (!this.checkCredentials()) { $Flinger.LogOut() }
                    setMenu = true;
                    break;
                case 'user':
                    $('li[data-path="user"]').addClass('active');
                    if (!this.checkCredentials()) { $Flinger.LogOut() }
                    setMenu = true;
                    break;
                case 'ip':
                    $('li[data-path="ip"]').addClass('active');
                    if (!this.checkCredentials()) { $Flinger.LogOut() }
                    setMenu = true;
                    break;
                case 'billing':
                    $('li[data-path="billing"]').addClass('active');
                    if (!this.checkCredentials()) { $Flinger.LogOut() }
                    setMenu = true;
                    break;
            }
            return setMenu;
        }
    },
    checkCredentials: function () {
        return localStorage.getItem("auth_token") == null || localStorage.getItem("userId") == null ? false : true;
    },
    Initialize: function(){
        
        let route = $Flinger.PathHandler.searchRoute($Flinger.PathHandler._routes)
        if(route != null){
            $Flinger.PathHandler.setItemMenu(route.PathName);
        }
        else{
            console.log('Flinger: This path isn\'t on the list, please insert this controller in PathHandler.js');
        }
    }
}

$Flinger.PathHandler.cleanNavigation();
$Flinger.PathHandler.Initialize();