$Flinger.Dialog = {
    _dlg: {},
    Initialize: function () {
        var dialog = document.getElementById("dialog");
        this._dlg = new DialogFx(dialog);
    },
    Toggle: function () {
        this._dlg.toggle();
    },
    SetData: function (title, text, acceptBtnText, closeBtnText) {
        if (title !== undefined && title !== null) {
            document.querySelector("#dialog>.dialog__content>div>[data-accept]").style.display = 'none';
            document.querySelector("#dialog>.dialog__content>div>[data-cancel]").style.display = 'none';
            document.querySelector("#dialog>.dialog__content>div>[data-accept]").className = document.querySelector("#dialog>.dialog__content>div>[data-accept]").className.replace(/\baccept-button\b/,'');
            document.querySelector("#dialog>.dialog__content>div>[data-accept]").className = document.querySelector("#dialog>.dialog__content>div>[data-accept]").className.replace(/\bcancel-button\b/,'');
            document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className = document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className.replace(/\baccept-button\b/,'');
            document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className = document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className.replace(/\bcancel-button\b/,'');

            document.querySelector("#dialog>.dialog__content>h2").textContent = title;
            document.querySelector("#dialog>.dialog__content>h4").innerHTML = text.length == 0 ? "" : $Flinger.SanitizeHTML.Sanitize(text);
            if (closeBtnText == undefined) {
                document.querySelector("#dialog>.dialog__content>div>[data-cancel]").style.display = 'initial';
                document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className += ' accept-button';

                document.querySelector("#dialog>.dialog__content>div>[data-cancel]").textContent = acceptBtnText == undefined ? "CLOSE" : acceptBtnText;
            }
            else {
                document.querySelector("#dialog>.dialog__content>div>[data-accept]").style.display = 'initial';
                document.querySelector("#dialog>.dialog__content>div>[data-cancel]").style.display = 'initial';
                document.querySelector("#dialog>.dialog__content>div>[data-accept]").className += ' accept-button';
                document.querySelector("#dialog>.dialog__content>div>[data-cancel]").className += ' cancel-button';

                document.querySelector("#dialog>.dialog__content>div>[data-accept]").textContent = acceptBtnText == undefined ? "CLOSE" : acceptBtnText;
                document.querySelector("#dialog>.dialog__content>div>[data-cancel]").textContent = closeBtnText == undefined ? "ACCEPT" : closeBtnText;
            }
        }
    }
}

$Flinger.Dialog.Initialize();