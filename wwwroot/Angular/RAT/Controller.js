Flinger.controller("RATController", function ($scope, RATService, $rootScope) {

    $scope.SocketId = {};
    $scope.Site = {}
    $scope._socket;
    $scope._ratSocket;
    $scope.ConnectedSockets = [];
    $scope.SocketUriServer = "";
    $scope.SiteNamespace = {};
    $scope.UserSocketId = '';
    $scope.RoomId = '';
    $scope.IsOnService = false;
    $scope.SettingUpLog = [];
    $scope.MousePos = {};

    $scope.InitializeView = function () {

        var SiteId = $Flinger.QueryString().Id;

        if (SiteId != undefined && SiteId != null) {
            RATService.GetSiteById(SiteId).then(function (response) {

                if (response.data.success === true) {
                    $scope.Site = response.data.result;

                    RATService.GetSocketUrl()
                        .then(function (response) {
                            //console.log(response);
                            $scope.SocketUriServer = response.data;
                            $scope.socketDefinition(response.data);
                        },
                        function (response) {
                            console.log(response);
                        })
                }
                else {
                    $Flinger.Loader.Finish();
                    $Flinger.Dialog.SetData("Error", response.data.message);
                    $Flinger.Dialog.Toggle();
                }


                //console.log(response.data);
            },
                function (response) {
                    console.log(response);
                })
        }
    }

    $scope.socketDefinition = function (url, namespace) {

        //connect to "admin pool" or site namespace
        $scope._socket = io(url + (namespace == undefined ? "/admin-pool-namespace" : namespace));

        $scope.socketEventDefinition();

    }

    $scope.socketEventDefinition = function () {
        $scope._socket.on('connect', function () {
            console.log('connect');
            $rootScope.$apply(function () {
                /// Do something into scope
            });
        });

        $scope._socket.on('Welcome', function (data) {
            $rootScope.$apply(function () {
                $scope.SocketId = data.SocketId;
                console.log('Welcome ' + data.SocketId)
                console.log($scope.Site)
                $scope._socket.emit('Coplest.Flinger.RAT', { Command: 'GetAllConnectedSocketsByApiKey#Request', Values: { ApiKey: $scope.Site.ApiKey } });
            });
        })

        $scope._socket.on('Coplest.Flinger.RAT', function (data) {
            switch (data.Command) {
                case 'GetAllConnectedSockets#Response':
                    //console.log(data);
                    $Flinger.Loader.Finish();
                    break;
                case 'GetAllConnectedSocketsByApiKey#Response':
                    $rootScope.$apply(function () {
                        //console.log(data);
                        $scope.ConnectedSockets = data.Values;
                        $Flinger.Loader.Finish();
                    });
                    break;
                case 'SubscribeSocketToApiKey#Request':
                    $rootScope.$apply(function () {
                        $scope.ConnectedSockets.push(data.Values);
                        //console.log($scope.ConnectedSockets)
                    });
                    break
                case 'UnsubscribeSocketToApiKey#Request':
                    //console.log(data)
                    $rootScope.$apply(function () {
                        var socketIndex;
                        // Search socket into array
                        for (var index = 0; index < $scope.ConnectedSockets.length; index++) {
                            if ($scope.ConnectedSockets[index].ApiKey == data.Values.SocketId) {
                                socketIndex = index;
                                break;
                            }

                        }
                        // Set sockets into scope
                        $scope.ConnectedSockets.splice(socketIndex, 1);
                    });
                    break;
                case 'GetEndpointRPN#Response':
                    console.log('GetEndpointRPN#Response')
                    $rootScope.$apply(function () {
                        $scope.ConnectToRPN(data.Values);
                    });
                    break;
                case 'ConnectedToRPN#Response':
                    console.log('ConnectedToRPN#Response')
                    $rootScope.$apply(function () {
                        $scope.SocketId = data.Values.SocketId;
                        $scope.CheckSiteNamespace();
                    });
                    console.log('RPN SocketId: ' + data.Values.SocketId);
                    break;
                case 'CheckSiteNamespace#Response':
                    console.log('CheckSiteNamespace#Response')
                    $rootScope.$apply(function () {
                        $scope.SiteNamespace = data.Values.Namespace;
                        $scope._socket.emit('Coplest.Flinger.RAT', { Command: 'CreatePrivateRoom#Request', Values: { Namespace: data.Values.Namespace, UserSocketId: $scope.UserSocketId } });
                    });
                    break;
                case 'CreatePrivateRoom#Response':
                    console.log('CreatePrivateRoom#Response')
                    $rootScope.$apply(function () {
                        $scope.RoomId = data.Values.RoomId;
                        $scope.RATServiceNamespace(data);
                    });
                    break;
                default:
                    break;
            }
        })

        /// Template for socket.emit
        ///socket.emit('Coplest.Flinger.RAT', {Command: 'CommandID', Values:{ID: socket.id}});
    }

    $scope.RATServiceNamespace = function (data) {
        $scope._socket.emit('Coplest.Flinger.RAT', { Command: 'ConnectToRATServiceNamespace#Request', Values: { Namespace: $scope.SiteNamespace } }, function (data) {

            if (data.Values.Namespace != undefined && data.Values.Namespace.length > 0) {
                var ns = ($Flinger.SearchObjectByIdOnArray($scope.SiteNamespace.Id, data.Values.Namespace));
                if (ns != null) {
                    $scope._ratSocket = io($scope.SocketUriServer + '/' + ns.Id);

                    $scope._ratSocket.on('Coplest.Flinger.RAT', function (data) {
                        switch (data.Command) {
                            case 'ConnectedToRSN#Response':
                                console.log('ConnectedToRSN#Response')
                                $rootScope.$apply(function () {
                                    $scope.SocketId = data.Values.SocketId;

                                    $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'AdminJoinToPrivateRoom#Request', Values: { RoomId: $scope.RoomId, SocketId: $scope.UserSocketId } });
                                });
                                break;
                            case 'AdminJoinToPrivateRoom#Response':
                                console.log('AdminJoinToPrivateRoom#Response');
                                break;
                            case 'TakeMyUserSocketId#Response':
                                $rootScope.$apply(function () {
                                    $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'AdminAllowControl#Request', Values: { RoomId: $scope.RoomId } });
                                });
                                break;
                            case 'UserAllowControl#Response':
                                console.log('UserAllowControl#Response');
                                $rootScope.$apply(function () {
                                    $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'SetRATEngine#Request', Values: { RoomId: $scope.RoomId } });
                                    $scope.IsOnService = true;
                                });

                                break;
                            case 'PrintCursor#Request':
                                $rootScope.$apply(function () {
                                    console.log('PrintCursor#Request')
                                    var item = 'Printing Virtual Cursor';
                                    if ($scope.SettingUpLog.indexOf(item) == -1) {
                                        $scope.SettingUpLog.push(item);
                                    }
                                });
                                break;
                            case 'SetInitialPositionCursor#Request':
                                $rootScope.$apply(function () {
                                    console.log('SetInitialPositionCursor#Request')
                                    var item = 'Positioning Virtual Cursor';
                                    if ($scope.SettingUpLog.indexOf(item) == -1) {
                                        $scope.SettingUpLog.push(item);
                                    }
                                });
                                break;
                            case 'HideRealCursor#Request':
                                $rootScope.$apply(function () {
                                    console.log('HideRealCursor#Request')
                                    var item = 'Hidding Real Cursor';
                                    if ($scope.SettingUpLog.indexOf(item) == -1) {
                                        $scope.SettingUpLog.push(item);
                                    }
                                });
                                break;
                            case 'SetScreenshotInterval#Request':
                                $rootScope.$apply(function () {
                                    console.log('SetScreenshotInterval#Request');
                                    var item = 'Setting up frames per second';
                                    if ($scope.SettingUpLog.indexOf(item) == -1) {
                                        $scope.SettingUpLog.push(item);
                                    }
                                    // Set last configuration
                                    $scope.InjectMouseHandler();
                                });
                                break;
                            default:
                                break;
                        }
                    })
                }
            }
        });
    }

    $scope.CheckSiteNamespace = function () {
        console.log('CheckSiteNamespace')
        $scope._socket.emit('Coplest.Flinger.RAT', { Command: 'CheckSiteNamespace#Request', Values: { SiteId: $scope.Site._id } });
    }

    $scope.ConnectToRPN = function (data) {
        console.log('ConnectToRPN')
        if (data.Endpoint != undefined) {
            console.log('ConnectToRPN:: ' + $scope.SocketUriServer + data.Endpoint)
            $scope._socket = io($scope.SocketUriServer + data.Endpoint);

            $scope.socketEventDefinition();
        }
    }

    $scope.GetEndpointRPN = function (socketId) {
        console.log('GetEndpointRPN')
        $scope.UserSocketId = socketId;
        $scope._socket.emit('Coplest.Flinger.RAT', { Command: 'GetEndpointRPN#Request', Values: {} });
    }

    $scope.InjectMouseHandler = function () {

        if (document.addEventListener) {
            // IE9, Chrome, Safari, Opera
            document.addEventListener("mousewheel", MouseWheelHandler, false);
            // Firefox
            document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        }
        // IE 6/7/8
        else document.attachEvent("onmousewheel", MouseWheelHandler);

        function MouseWheelHandler(e) {
            // cross-browser wheel delta
            var e = window.event || e; // old IE support
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

            $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'SetScrollDelta#Request', Values: { RoomId: $scope.RoomId, Delta: delta } });
        }

        document.onmousemove = function () {
            var eventDoc, doc, body, pageX, pageY;

            if (event.pageX == null && event.clientX != null) {
                eventDoc = (event.target && event.target.ownerDocument) || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = event.clientX +
                    (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                    (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY +
                    (doc && doc.scrollTop || body && body.scrollTop || 0) -
                    (doc && doc.clientTop || body && body.clientTop || 0);
            }

            $scope.MousePos = {
                RoomId: $scope.RoomId,
                X: event.pageX,
                Y: event.pageY
            };

            $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'SetPositionMouse#Request', Values: $scope.MousePos })
        };

        document.querySelector('#rat-visor').onclick = function () {
            console.log($scope.MousePos)
            $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'Click#Request', Values: $scope.MousePos })
        }
    }
});