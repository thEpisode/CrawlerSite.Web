/**
 * Show dialog with multiple options
 * 
 * @function SetData
 * @param title: string
 * @param text: string
 * @param buttons: array e.g.
 * 
 * Usage: 
    $Flinger.Dialog.SetData(
        "Some Title Text", 
        "<input placeholder='Example of HTML usage' class='input-voucher form-control' type='text' autofocus />", 
        [
            { 
                text: 'ACCEPT', 
                className: $Flinger.Dialog.GetAcceptButtonStyle(), 
                attributes: [
                                { action: 'data-accept', value: '' }
                ],
                callback: function(){
                    console.log('Click from Accept Button')
                } 
            }, 
            { 
                text: 'CLOSE', 
                className: $Flinger.Dialog.GetCancelButtonStyle(), 
                attributes: [
                                { action: 'data-cancel', value: '' }, 
                                { action: 'data-dialog-close', value: '' }
                ]
            }
        ]);
 */
$Flinger.Dialog = {
    _dlg: {},
    _buttons: {},
    _designButton: function (buttonData) {
        var button = document.createElement('button');
        button.className = 'action';
        button.className += buttonData.className == undefined ? ' ' + this.GetAcceptButtonStyle() : ' ' + buttonData.className;
        button.textContent = buttonData.text == undefined ? '' : buttonData.text;

        if (buttonData.attributes != undefined) {
            if (buttonData.attributes.length > 0) {
                buttonData.attributes.forEach(function (element) {
                    button.setAttribute(element.action, element.value);
                }, this);
            }
        }

        button.addEventListener('click', function (e) {
            e.preventDefault();
            if (buttonData.callback != undefined && buttonData.callback != null) {
                return new buttonData.callback();
            }
            else {
                $Flinger.Dialog.Toggle();
            }
        });

        return button;
    },
    _createButtons: function (buttons) {
        var _buttons = document.querySelector("#dialog>.dialog__content>div");
        if (buttons != undefined && buttons != null) {
            if (buttons.length > 0) {
                var i = 0;

                buttons.forEach(function (value) {
                    _buttons.appendChild(this._designButton(value));

                    i++;
                }, this);
            }
            else if (buttons.length === 0) {
                _buttons.appendChild(this._designButton({ text: 'CLOSE', className: 'accept-button', attributes: [{ action: 'data-accept', value: '' }, { action: 'data-dialog-close', value: '' }] }));
            }
        }
        else {
            _buttons.appendChild(this._designButton({ text: 'CLOSE', className: this.CancelButtonStyle, attributes: [{ action: 'data-accept', value: '' }, { action: 'data-dialog-close', value: '' }] }));
        }
    },
    Initialize: function () {
        var dialog = document.getElementById("dialog");
        this._dlg = new DialogFx(dialog);
    },
    Toggle: function () {
        this._dlg.toggle();
    },
    SetData: function (title, text, buttons) {
        if (title !== undefined && title !== null) {
            if (text !== undefined && text !== null) {
                this.CleanDialog();
                document.querySelector("#dialog>.dialog__content>h2").textContent = title;
                document.querySelector("#dialog>.dialog__content>h4").innerHTML = text.length == 0 ? "" : $Flinger.SanitizeHTML.Sanitize(text);

                this._createButtons(buttons);
                this.Toggle();
            }
        }
    },
    CleanDialog: function () {
        document.querySelector("#dialog>.dialog__content>h2").textContent = '';
        document.querySelector("#dialog>.dialog__content>h4").innerHTML = '';
        document.querySelector("#dialog>.dialog__content>div").innerHTML = '';
    },
    GetAcceptButtonStyle: function () {
        return "accept-button"
    },
    GetCancelButtonStyle: function () {
        return "cancel-button"
    },
    IsOpen: function(){
        return this._dlg.isOpen;
    }
}

$Flinger.Dialog.Initialize();