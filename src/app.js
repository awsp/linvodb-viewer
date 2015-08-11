var operation = require('./lib/operation');
var LinvoDB = require("linvodb3");
LinvoDB.defaults.store = {db: require("medeadown")};

(function (webix, $, LinvoDB) {
  var timeoutId;

  webix.ready(function () {
    webix.ui({
      container: "linvodb-viewer",
      id: "linvodb-viewer",
      height: window.innerHeight,
      width: window.innerWidth,
      rows: [
        {
          template: '<div id="datatable"><div id="drop-notice">Drop folder here!</div></div>'
        }
      ]
    });

    var fileHolder = document.getElementById('linvodb-viewer');
    fileHolder.ondragover = function () {
      return false;
    };
    fileHolder.ondragleave = function () {
      return false;
    };
    fileHolder.ondrop = function (e) {
      e.preventDefault();
      var file = e.dataTransfer.files[0];
      try {
        operation.loadDoc(file.path, LinvoDB, webix);
      }
      catch (e) {
        var remote = require('remote');
        var dialog = remote.require('dialog');
        dialog.showMessageBox({
          type: 'error',
          title: "Error",
          message: "The folder you have opened does not seem to be a valid LinvoDB database. ",
          buttons: ['OK']
        });
      }
      return false;
    };
  });

  $(window).resize(function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function doneResizing() {
      $$("linvodb-viewer").config.width = window.innerWidth;
      $$("linvodb-viewer").config.height = window.innerHeight;
      $$("linvodb-viewer").resize();

      if ($$("datatable")) {
        $$("datatable").config.width = window.innerWidth;
        $$("datatable").config.height = window.innerHeight;
        $$("datatable").resize();
      }
    }, 250);
  });

})(webix, jQuery, LinvoDB);