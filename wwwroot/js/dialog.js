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
        "Invitation code:", 
        "<input placeholder='Insert here' class='input-voucher form-control' type='text' autofocus />", 
        [
            { 
                text: 'ACCEPT', 
                className: 'accept-button', 
                attributes: [
                                { action: 'data-accept', value: '' }
                ],
                callback: function(){
                    console.log('Click from Accept Button')
                } 
            }, 
            { 
                text: 'CLOSE', 
                className: 'cancel-button', 
                attributes: [
                                { action: 'data-cancel', value: '' }, 
                                { action: 'data-dialog-close', value: '' }
                ],
                callback: function(){
                    console.log('Click from Close Button')
                } 
            }
        ]);
 */
$Flinger.Dialog = {
    _dlg: {},
    _buttons: {},
    Initialize: function () {
        var dialog = document.getElementById("dialog");
        this._dlg = new DialogFx(dialog);
    },
    Toggle: function () {
        this._dlg.toggle();
    },
    SetData: function (title, text, buttons) {
        if (title !== undefined && title !== null) {
            this.CleanDialog();
            document.querySelector("#dialog>.dialog__content>h2").textContent = title;
            document.querySelector("#dialog>.dialog__content>h4").innerHTML = text.length == 0 ? "" : $Flinger.SanitizeHTML.Sanitize(text);

            this._createButtons(buttons);
            this.Toggle();
        }
    },
    _designButton: function (buttonData) {
        var button = document.createElement('button');

        button.className = 'action' + buttonData.className == undefined ? '' : ' ' + buttonData.className;
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
            return new buttonData.callback();
        });

        return button;
    },
    _createButtons: function (buttons) {
        //document.querySelector("#dialog>.dialog__content>div>[data-accept]").textContent = acceptBtnText == undefined ? "CLOSE" : acceptBtnText;
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
            _buttons.appendChild(this._designButton({ text: 'CLOSE', className: 'accept-button', attributes: [{ action: 'data-accept', value: '' }, { action: 'data-dialog-close', value: '' }] }));
        }
        //document.querySelector("#dialog>.dialog__content>div").appendChild(_buttons);
    },
    CleanDialog: function () {
        /*document.querySelector("#dialog>.dialog__content>div>[data-accept]").style.display = 'none';
        document.querySelector("#dialog>.dialog__content>div>[data-cancel]").style.display = 'none';
        document.querySelector("#dialog>.dialog__content>div>[data-accept]").className = document.querySelector("#dialog>.dialog__content>div>[data-accept]").className.replace(/\baccept-button\b/, '');
        document.querySelector("#dialog>.dialog__content>div>[data-accept]").className = document.querySelector("#dialog>.dialog__content>div>[data-accept]").className.replace(/\bcancel-button\b/, '');
        document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className = document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className.replace(/\baccept-button\b/, '');
        document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className = document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className.replace(/\bcancel-button\b/, '');*/
        document.querySelector("#dialog>.dialog__content>h2").textContent = '';
        document.querySelector("#dialog>.dialog__content>h4").innerHTML = '';
        /*document.querySelector("#dialog>.dialog__content>div>[data-accept]").textContent = '';
        document.querySelector("#dialog>.dialog__content>div>[data-cancel]").textContent = '';*/
    }
}

$Flinger.Dialog.Initialize();