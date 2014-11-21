"use strict";

tutao.provide('tutao.tutanota.ctrl.ModalDialogViewModel');

/**
 * The ViewModel for alert and confirm dialogs.
 * @constructor
 */
tutao.tutanota.ctrl.ModalDialogViewModel = function() {
	tutao.util.FunctionUtils.bindPrototypeMethodsToThis(this);

	this.message = ko.observable("");
    this.buttons = ko.observableArray();
    this.visible = ko.observable(false);
};

/**
 * Shows an alert dialog with an "ok" button.
 * @param {string} message The text to display in the dialog.
 * @return {Promise} Resolved when the dialog is closed by the user.
 */
tutao.tutanota.ctrl.ModalDialogViewModel.prototype.showAlert = function(message) {
    return this.showDialog(message, ["ok_action"]);
};

/**
 * Shows a confirm dialog with an "ok" button and a "cancel" button.
 * @param {string} message The text to display in the dialog.
 * @return {Promise<bool>} Resolved when the dialog is closed by the user. Returns true if the ok button was selected, false if the cancel button was selected.
 */
tutao.tutanota.ctrl.ModalDialogViewModel.prototype.showConfirm = function(message) {
    return this.showDialog(message, ["ok_action", "cancel_action"]).then(function(buttonIndex) {
        return (buttonIndex == 0);
    });
};

/**
 * Shows the dialog with the given buttons. Returns the index of the button that was selected by the user.
 * @param {string} message The text to display in the dialog.
 * @param {Array.<string>} buttonTextIds The texts to show on the buttons. The number text ids is the number of buttons that are shown.
 */
tutao.tutanota.ctrl.ModalDialogViewModel.prototype.showDialog = function(message, buttonTextIds) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.message(message);
        var buttons = [];
        for (var i=0; i<buttonTextIds.length; i++) {
            (function() { // wrapper function is needed to make buttonIndex available in the closure
                var buttonIndex = i;
                buttons.push({ text: buttonTextIds[i], click: function() {
                    self.visible(false);
                    resolve(buttonIndex);
                }});
            })();
        }
        self.buttons(buttons);
        self.visible(true);
    });
};
