Flinger.filter('devicetype', function () {
    return function (input) {
        var DeviceIcons = {
            Type: {
                Desktop: { Value: 'fa fa-desktop' },
                Mobile: { Value: 'fa fa-mobile' },
                Tablet: { Value: 'fa fa-tablet' }
            }
        }
        if (parseInt(input) < 765) {
            return DeviceIcons.Type.Mobile.Value;
        }
        else if (parseInt(input) >= 765 && parseInt(input) < 1025) {
            return DeviceIcons.Type.Tablet.Value;
        }
        else if (parseInt(input) >= 1025) {
            return DeviceIcons.Type.Desktop.Value;
        }
        else {
            return DeviceIcons.Type.Mobile.Value;
        }
    }
})

Flinger.filter('devicetypename', function () {
    return function (input) {

        if (parseInt(input) < 765) {
            return 'Phone';
        }
        else if (parseInt(input) >= 765 && parseInt(input) < 1025) {
            return 'Tablet';
        }
        else if (parseInt(input) >= 1025) {
            return 'Desktop';
        }
        else {
            return 'Phone';
        }
    }
})

Flinger.filter('deviceos', function () {
    return function (input) {
        var DeviceIcons = {
            OS: {
                Windows: { Value: 'fa fa-windows' },
                Apple: { Value: 'fa fa-apple' },
                Linux: { Value: 'fa fa-linux' },
                Android: { Value: 'fa fa-android' }
            }
        }
        switch (input) {
            case 'Windows':
                return DeviceIcons.OS.Windows.Value;
            case 'Mac OS X':
            case 'iOS':
                return DeviceIcons.OS.Apple.Value;
            case 'Android':
                return DeviceIcons.OS.Android.Value;
            default:
                return DeviceIcons.OS.Linux.Value;
        }
    }
})

Flinger.filter('devicebrowser', function () {
    return function (input) {
        var DeviceIcons = {
            Browser: {
                Opera: { Value: 'fa fa-opera' },
                Edge: { Value: 'fa fa-edge' },
                IE: { Value: 'fa fa-internet-explorer' },
                Chrome: { Value: 'fa fa-chrome' },
                Safari: { Value: 'fa fa-safari' },
                Firefox: { Value: 'fa fa-firefox' },
                Other: { Value: 'fa fa-html5' }
            }
        }
        switch (input) {
            case 'Opera':
                return DeviceIcons.Browser.Opera.Value;
            case 'Edge':
                return DeviceIcons.Browser.Edge.Value;
            case 'Microsoft Internet Explorer':
                return DeviceIcons.Browser.IE.Value;
            case 'Chrome':
                return DeviceIcons.Browser.Chrome.Value;
            case 'Safari':
                return DeviceIcons.Browser.Safari.Value;
            case 'Firefox':
                return DeviceIcons.Browser.Firefox.Value;
            default:
                return DeviceIcons.Browser.Other.Value;
        }
    }
})

Flinger.filter('splitid', function () {
    return function (input) {
        return input.slice(0, input.length / 2);
    }
})

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
    $scope.ScreenshotReceived = false;
    $scope.SettingUpLog = [];
    $scope.MousePos = {};
    $scope.Screenshot = "";
    $scope._scrollPos = 0;
    $scope.CurrentUserPath = "";
    $scope.CurrentWindowTitle = "";
    $scope.isInFullScreen = false;
    $scope.IsMaximized = false;
    $scope._iframe = null;

    $scope.InitializeView = function () {

        var SiteId = $Flinger.QueryString().Id;

        if (SiteId != undefined && SiteId != null) {
            RATService.GetSiteById(SiteId).then(function (response) {

                if (response.data.success === true) {
                    $scope.Site = response.data.result;

                    RATService.GetSocketUrl()
                        .then(function (response) {
                            console.log('uri:')
                            console.log(response);
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
                case 'GetAllConnectedSocketsByApiKey#Response':
                    $rootScope.$apply(function () {
                        console.log('GetAllConnectedSocketsByApiKey#Response')
                        console.log(data);
                        $scope.ConnectedSockets = data.Values;
                        for(var i = 0; i<$scope.ConnectedSockets.length; i++){
                            $scope.PrintMapMarker($scope.ConnectedSockets[i].ClientInformation.Location.location)
                        }
                        $Flinger.Loader.Finish();
                    });
                    break;
                case 'SubscribeSocketToApiKey#Request':
                    $rootScope.$apply(function () {
                        if (data.Values.ApiKey === $scope.Site.ApiKey) {
                            $scope.ConnectedSockets.push(data.Values);
                            console.log('SubscribeSocketToApiKey#Request')
                            console.log($scope.ConnectedSockets);

                            $scope.PrintMapMarker(data.Values.ClientInformation.Location.location);
                        }
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
                                    $scope.IsOnService = true;
                                    $('footer').hide();
                                    $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'AdminAllowControl#Request', Values: { RoomId: $scope.RoomId } });
                                    var item = 'Waiting for user permission';
                                    if ($scope.SettingUpLog.indexOf(item) == -1) {
                                        $scope.SettingUpLog.push(item);
                                    }
                                });
                                break;
                            case 'UserDenyControl#Response':
                                console.log('UserAllowControl#Response');
                                $Flinger.Dialog.SetData("Remote Administration Tool", "User deny access to their computer");
                                // Connect to admin-pool-namespace
                                $rootScope.$apply(function () {
                                    var item = 'User Deny access';
                                    if ($scope.SettingUpLog.indexOf(item) == -1) {
                                        $scope.SettingUpLog.push(item);
                                    }
                                    $scope.socketDefinition($scope.SocketUriServer);
                                });
                                break;
                            case 'UserAllowControl#Response':
                                console.log('UserAllowControl#Response');
                                $rootScope.$apply(function () {
                                    var item = 'User accepted request';
                                    if ($scope.SettingUpLog.indexOf(item) == -1) {
                                        $scope.SettingUpLog.push(item);
                                    }
                                    $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'SetRATEngine#Request', Values: { RoomId: $scope.RoomId } });
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
                            case 'RefreshScreenshot#Request':
                                $rootScope.$apply(function () {
                                    console.log('RefreshScreenshot#Request');
                                    var item = 'Screenshot received';
                                    if ($scope.SettingUpLog.indexOf(item) == -1) {
                                        $scope.SettingUpLog.push(item);
                                    }

                                    $scope.ScreenshotReceived = true;
                                    $scope.CurrentUserPath = data.Values.CurrentUserPath;
                                    $scope.CurrentWindowTitle = data.Values.CurrentWindowTitle;

                                    $scope.PrintFrame(data);
                                    //$scope.Screenshot = data.Values.Screenshot;
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

    $scope.SendReverseShellCommand = function (rsc) {
        const reverseShellCommand = `${rsc}`;

        $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'SendReverseShellCommand#Request', Values: { RoomId: $scope.RoomId, RSC: reverseShellCommand } });
    }

    $scope.ReloadVisor = function () {
        $scope.SendReverseShellCommand("location.reload()");
    }

    $scope.HomeVisor = function () {
        $scope.SendReverseShellCommand("location.assign('/')");
    }

    $scope.BackVisor = function () {
        $scope.SendReverseShellCommand("history.back()");
    }

    $scope.ForwardVisor = function () {
        $scope.SendReverseShellCommand("history.forward()");
    }

    $scope.NavigateVisor = function () {
        $('.tools-bar>input').blur();
        $scope.SendReverseShellCommand(`location.assign('${$scope.CurrentUserPath}')`);
    }

    $scope.PrintFrame = function (data) {
        /**
         * Preserving aspect radio
         */
        var browserSize = {};
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        browserSize.width = x;
        browserSize.height = y;
        //document.querySelector('#frame-container').innerHTML = '';

        var currentFrameIdx = 0;
        var framesContainer = document.querySelector('#frame-container');
        var eventHandler = document.querySelector('.event-handler');
        var blob = new Blob([data.Values.Screenshot], { type: 'text/html' });

        var iframeVisorWidthBorder = browserSize.width - 20;
        var iframeVisorHeightBorder = browserSize.height - 20;
        var originalWidthSize = data.Values.UserBrowserScreen.width;
        var originalHeightSize = data.Values.UserBrowserScreen.height;
        var widthAverage = iframeVisorWidthBorder / originalWidthSize;
        var heightAverage = iframeVisorHeightBorder / originalHeightSize;

        //var iframeScale = widthAverage > heightAverage ? Math.min(1, widthAverage) : Math.min(1, heightAverage);
        var iframeScale = Math.min(1, widthAverage);
        var iframeScaleCSS = "scale(" + iframeScale + "," + iframeScale + ")";
        var iframeWidthRate = data.Values.UserBrowserScreen.width * iframeScale;
        var iframeHeightRate = data.Values.UserBrowserScreen.height * iframeScale;
        var iframeMarginLeft = Math.min(Math.round((iframeVisorWidthBorder - iframeWidthRate) / 2) + 10, 10);
        var iframeMarginTop = Math.min(Math.round((iframeVisorHeightBorder - iframeHeightRate) / 2) + 10, 10);

        /// Creating iframe
        $scope._iframe = document.createElement('iframe');
        /// Rendering content
        $scope._iframe.src = window.URL.createObjectURL(blob);
        /// Setting Dimensions
        $scope._iframe.setAttribute("width", Math.round(iframeWidthRate) + "px");
        $scope._iframe.setAttribute("height", Math.round(iframeHeightRate) + "px");
        $scope._iframe.style.width = Math.round(data.Values.UserBrowserScreen.width) + "px";
        $scope._iframe.style.height = Math.round(data.Values.UserBrowserScreen.height) + "px";

        /// Setting Scale
        $scope._iframe.style.webkitTransform = iframeScaleCSS;
        $scope._iframe.style.transform = iframeScaleCSS;
        $scope._iframe.style.OTransform = iframeScaleCSS;
        $scope._iframe.style.MozTransform = iframeScaleCSS;
        $scope._iframe.style.msTransform = iframeScaleCSS;
        $scope._iframe.style.transformOrigin = "0 0";
        $scope._iframe.style.display = "block";

        /// Setting Frames Container
        framesContainer.style.marginTop = iframeMarginTop + "px";
        framesContainer.style.marginLeft = iframeMarginLeft + "px";
        /* framesContainer.style.width = Math.round(iframeWidthRate) + "px";
        framesContainer.style.height = Math.round(iframeHeightRate) + "px"; */

        /// Setting Event Handler
        eventHandler.style.marginTop = "75px";
        //eventHandler.style.marginTop = iframeMarginTop + "px";
        eventHandler.style.marginLeft = iframeMarginLeft + "px";
        eventHandler.style.width = Math.round(iframeWidthRate) + "px";
        eventHandler.style.height = Math.round(iframeHeightRate) + "px";

        //// End Preserving aspect ratio
        $scope._iframe.hidden = true;
        $scope._iframe.id = "rat-iframe"
        $scope._iframe.onload = function () {
            if (framesContainer.children.length) {
                var frame = framesContainer.children[currentFrameIdx];

                if (!frame) {
                    return;
                }

                if (currentFrameIdx > 0) {
                    var prevFrame = frame.previousElementSibling;
                    prevFrame.hidden = true;
                    window.URL.revokeObjectURL(prevFrame.src);
                }

                frame.hidden = false;

                currentFrameIdx++;

                var iframeVisorWidthBorder = framesContainer.clientWidth - 20;

                var widthAverage = iframeVisorWidthBorder / originalWidthSize;
                var heightAverage = iframeVisorHeightBorder / originalHeightSize;

                var iframeScale = Math.min(1, widthAverage);
                var iframeScaleCSS = "scale(" + iframeScale + "," + iframeScale + ")";
                var iframeWidthRate = data.Values.UserBrowserScreen.width * iframeScale;
                var iframeHeightRate = data.Values.UserBrowserScreen.height * iframeScale;

                framesContainer.style.width = Math.round(iframeWidthRate) + "px";
                framesContainer.style.height = Math.round(iframeHeightRate) + "px";

                /// Setting Scale
                $scope._iframe.style.webkitTransform = iframeScaleCSS;
                $scope._iframe.style.transform = iframeScaleCSS;
                $scope._iframe.style.OTransform = iframeScaleCSS;
                $scope._iframe.style.MozTransform = iframeScaleCSS;
                $scope._iframe.style.msTransform = iframeScaleCSS;
                $scope._iframe.style.transformOrigin = "0 0";
                $scope._iframe.style.display = "block";

                /// Setting Dimensions
                $scope._iframe.setAttribute("width", Math.round(iframeWidthRate) + "px");
                $scope._iframe.setAttribute("height", Math.round(iframeHeightRate) + "px");
                $scope._iframe.style.width = Math.round(data.Values.UserBrowserScreen.width) + "px";
                $scope._iframe.style.height = Math.round(data.Values.UserBrowserScreen.height) + "px";
            }

        };

        // Force the iframe content to load by appending to the DOM.
        if (document.querySelector('#rat-iframe') !== null) {
            document.querySelector('#rat-iframe').parentNode.replaceChild($scope._iframe, document.querySelector('#rat-iframe'));
        }
        else {
            //document.querySelector('#frame-container').innerHTML = '';
            framesContainer.appendChild($scope._iframe);
        }
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

            var step = 80;
            var currentPosition = document.querySelector('iframe').contentWindow.document.body.scrollTop || 0;
            $scope._scrollPos = (currentPosition + (step * (delta)) * -1);
            //document.querySelector('iframe').contentWindow.scrollTo(0, $scope._scrollPos);
            $scope._iframe.contentWindow.scrollTo(0, $scope._scrollPos);
        }

        document.querySelector('.event-handler').onmousemove = function () {
            var eventDoc, doc, body, pageX, pageY;
            var relativeElementX = document.querySelector('.event-handler').getBoundingClientRect().left - document.getElementsByTagName("html")[0].getBoundingClientRect().left;
            var relativeElementY = document.querySelector('.event-handler').getBoundingClientRect().top - document.getElementsByTagName("html")[0].getBoundingClientRect().left;

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
                X: event.pageX - relativeElementX,
                Y: event.pageY - relativeElementY
            };

            $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'SetPositionMouse#Request', Values: $scope.MousePos })
        };

        document.querySelector('.event-handler').onclick = function () {
            console.log($scope.MousePos)
            $scope._ratSocket.emit('Coplest.Flinger.RAT', { Command: 'Click#Request', Values: $scope.MousePos })
        }
    }

    $scope.ExpandRATViewer = function () {
        if ($scope.isInFullScreen === false) {
            $scope.isInFullScreen = true;
            var ratVisor = document.querySelector('#rat-visor');
            if (ratVisor.requestFullscreen) {
                ratVisor.requestFullscreen();
            } else if (ratVisor.webkitRequestFullscreen) {
                ratVisor.webkitRequestFullscreen();
            } else if (ratVisor.mozRequestFullScreen) {
                ratVisor.mozRequestFullScreen();
            } else if (ratVisor.msRequestFullscreen) {
                ratVisor.msRequestFullscreen();
            }
        }
        else {
            $scope.isInFullScreen = false;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    $scope.MazimizeRATViewer = function () {
        if ($scope.IsMaximized === false) {
            $scope.IsMaximized = true;
            document.querySelector('.sidebar').style.display = 'none';
            document.querySelector('.main-panel').style.width = '100%';
        }
        else {
            $scope.IsMaximized = false;
            document.querySelector('.sidebar').style.display = 'block';
            document.querySelector('.main-panel').style.width = 'calc(100% - 260px)';
        }
    }

    $scope.ReloadRATViewer = function () {
        window.location.reload();
    }

    $scope.BlockUser = function (socketId) {
        if (socketId !== undefined && socketId !== null) {
            RATService.BlockUser(socketId).then(function (response) {
                // Do something
            },
                function (response) {
                    console.log(response);
                })
        }
    }

    $scope.EditBlockUserText = function (text) {
        if ($scope.Site.BlockUserText !== text) {
            RATService.EditBlockUserText($scope.Site._id, text).then(function (response) {
                // Do something
            },
                function (response) {
                    console.log(response);
                });
        }
    }

    $scope.PromptToBlockUser = function (socketId) {
        console.log(socketId)
        console.log($scope.Site.BlockUserText);
        $Flinger.Dialog.SetData(
            `Block user ${socketId}`,
            `<p class="text-center">Your users needs to see something when they are blocked, we created a scary screen for spammers and hackers</p><input placeholder='Insert some text to show on blocked user' class='edit-block-text-input form-control' type='text' autofocus value="${$scope.Site.BlockUserText}" /><p>Warning: Message is displayed for all blocked users!</p>`,
            [
                {
                    text: 'BLOCK',
                    className: $Flinger.Dialog.GetAcceptButtonStyle(),
                    attributes: [
                        { action: 'data-accept', value: '' }
                    ],
                    callback: function () {
                        $scope.EditBlockUserText($('.edit-block-text-input').val());
                        $scope.BlockUser(socketId);
                        $Flinger.Dialog.Toggle();
                    }
                },
                {
                    text: 'CANCEL',
                    className: $Flinger.Dialog.GetCancelButtonStyle(),
                    attributes: [
                        { action: 'data-cancel', value: '' },
                        { action: 'data-dialog-close', value: '' }
                    ]
                }
            ]);
    }

    $scope.PrintMapMarker = function (location) {
        console.log(location)
        if (location !== undefined && location !== null) {
            CustomMarker.prototype = new google.maps.OverlayView();

            function CustomMarker(opts) {
                this.setValues(opts);
            }

            CustomMarker.prototype.draw = function () {
                var self = this;
                var div = this.div;
                if (!div) {
                    div = this.div = $(`
                        <div>
                            <div class="pin-wrap">
                                <div class="pulse"></div>
                                <div class="pin"></div>
                            </div>
                        </div>
                        `)[0];
                    this.pinWrap = this.div.getElementsByClassName('pin-wrap');
                    this.pin = this.div.getElementsByClassName('pin');
                    div.style.position = 'absolute';
                    div.style.cursor = 'pointer';
                    var panes = this.getPanes();
                    panes.overlayImage.appendChild(div);
                    google.maps.event.addDomListener(div, "click", function (event) {
                        google.maps.event.trigger(self, "click", event);
                    });
                }
                var point = this.getProjection().fromLatLngToDivPixel(this.position);
                if (point) {
                    div.style.left = point.x + 'px';
                    div.style.top = point.y + 'px';
                }
            };

            var pos = new google.maps.LatLng(location.latitude, location.longitude);

            var marker = new CustomMarker({
                position: pos,
                map: map,
            });

            google.maps.event.addListener(marker, 'click', function (e) {
                //marker.animateWobble();
            });
        }
    }
});