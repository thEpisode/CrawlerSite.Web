$Flinger.Toast = {
    Simple: function (Title, Message, Icon) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.show({
                color: '#FFFFFF',
                icon: (Icon != undefined) ? Icon : '',
                title: Title,
                message: Message,
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: '#EB5E28'
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    SimpleWithButtons: function (Title, Message, Icon) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.show({
                color: '#FFFFFF',
                icon: (Icon != undefined) ? Icon : '',
                title: Title,
                message: Message,
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: '#EB5E28',
                buttons: Buttons
            });
        }
    },
    Info: function (Title, Message) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.info({
                title: Title,
                message: Message,
                position: 'topRight',
                transitionIn: 'fadeInDown'
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    InfoWithButtons: function (Title, Message, Buttons) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.info({
                title: Title,
                message: Message,
                position: 'topRight',
                transitionIn: 'fadeInDown',
                buttons: Buttons
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    Success: function (Title, Message) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.success({
                title: Title,
                message: Message,
                position: 'topRight',
                transitionIn: 'fadeInDown'
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    SuccessWithButtons: function (Title, Message, Buttons) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.success({
                title: Title,
                message: Message,
                position: 'topRight',
                transitionIn: 'fadeInDown',
                buttons: Buttons
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    Warning: function (Title, Message) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.warning({
                title: Title,
                message: Message,
                position: 'topRight',
                transitionIn: 'fadeInDown'
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    WarningWithButtons: function (Title, Message, Buttons) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.warning({
                title: Title,
                message: Message,
                position: 'topRight',
                transitionIn: 'fadeInDown',
                buttons: Buttons
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    Error: function (Title, Message) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.error({
                title: Title,
                message: Message,
                position: 'topRight',
                transitionIn: 'bounceInLeft'
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    ErrorWithButtons: function (Title, Message, Buttons) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.error({
                title: Title,
                message: Message,
                position: 'topRight',
                transitionIn: 'bounceInLeft',
                buttons: Buttons
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    SimpleWithoutFormat: function (Title, Message, Icon, Color) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.show({
                color: (Color != undefined) ? Color : 'dark',
                icon: (Icon != undefined) ? Icon : '',
                title: Title,
                message: Message,
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: (Color == undefined) ? 'rgb(0, 255, 184)' : ''
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    //Buttons: [['<button>Ok</button>', function (instance, toast) {alert("Hello world!");}],['<button>Close</button>', function (instance, toast) {instance.hide({ transitionOut: 'fadeOutUp' }, toast);}]]
    SimpleWithoutFormatAndButtons: function (Title, Message, Buttons, Icon, Color) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            iziToast.show({
                color: (Color != undefined) ? Color : 'dark',
                icon: (Icon != undefined) ? Icon : '',
                title: Title,
                message: Message,
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                progressBarColor: (Color == undefined) ? 'rgb(0, 255, 184)' : '',
                buttons: Buttons
            });
        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    ToNextReload: function (Type, Title, Message, Icon) {
        if ((Title != undefined && Title != null) && (Message != undefined && Message != null)) {
            if ($Flinger.ReadPersistentData('ToastNotification') != null) {
                var notifications = JSON.parse($Flinger.ReadPersistentData('ToastNotification'));
                notifications.push({ Title: Title, Message: Message, Type: Type, Icon: Icon })
                $Flinger.AddPersistentData('ToastNotification', notifications);
            }
            else {
                var notifications = [];
                notifications.push({ Title: Title, Message: Message, Type: Type, Icon: Icon })
                $Flinger.AddPersistentData('ToastNotification', notifications);
            }

        }
        else {
            throw Error("To show a toast it need a Title and Message mandatory")
        }
    },
    DaemonReload: function () {
        if ($Flinger.ReadPersistentData('ToastNotification') != null) {
            var notifications = JSON.parse($Flinger.ReadPersistentData('ToastNotification'));

            notifications.forEach(function (notification) {
                $Flinger.Toast[notification.Type](notification.Title, notification.Message, notification.Icon);
            }, this);

            $Flinger.RemovePersistentData('ToastNotification')
        }
    },
    Initialize: function () {
        iziToast.settings({
            timeout: 10000,
            resetOnHover: true,
            transitionIn: 'fadeInDown',
            transitionOut: 'flipOutX'
        });
        $Flinger.Toast.DaemonReload();
    },
}

$Flinger.Toast.Initialize();