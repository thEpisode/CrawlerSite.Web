if (window.addEventListener) {
    addEventListener('storage', function (e) {
        
        if (location.pathname.toLowerCase() !== "/home/login") {
            if (e.key === 'auth_token' || e.key === 'userId') {
                $Flinger.LogOut();
            }
        }
    }, false);
}