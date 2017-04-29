$Flinger.Dialog = {
    _dlg: {},
    Initialize: function () {
        var dialog = document.getElementById("dialog");
        this._dlg = new DialogFx(dialog);
    },
    Toggle: function () {
        this._dlg.toggle();
    },
    SetData: function (title, text, btnText) {
        if (title !== undefined && title !== null) {
            document.querySelector("#dialog>.dialog__content>h2").textContent = title,
            document.querySelector("#dialog>.dialog__content>h4").textContent = text.length == 0 ? "" : $Flinger.SanitizeHTML(text),
            document.querySelector("#dialog>.dialog__content>div>button").textContent = btnText == undefined ? "CLOSE" : btnText;
        }
    }
}

$Flinger.Dialog.Initialize();