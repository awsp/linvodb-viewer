var remote = require('remote');
var ipc = require('ipc');
var Menu = remote.require('menu');
var dialog = remote.require('dialog');
var operation = require('./lib/operation');
var LinvoDB = require("linvodb3");

var template = [
  {
    label: 'LinvoDB Viewer',
    submenu: [
      {
        label: 'About LinvoDB Viewer',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide LinvoDB Viewer',
        accelerator: 'CmdOrCtrl+H',
        selector: 'hide:'
      },
      {
        label: 'Hide Others',
        accelerator: 'CmdOrCtrl+Shift+H',
        selector: 'hideOtherApplications:'
      },
      {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        selector: 'terminate:'
      },
    ]
  },
  {
    label: 'Database',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
          dialog.showOpenDialog({
            properties: ['openDirectory', 'multiSelections']
          }, function (fileDir) {
            operation.loadDb(LinvoDB, fileDir[0], function (Doc) {
              Doc.find({}, function (err, docs) {
                if (docs.length > 0) {
                  var schema = operation.getSchema(docs[0]);
                  $("#drop-notice").hide();

                  if (operation.instance) {
                    operation.instance.destructor();
                  }

                  operation.instance = new webix.ui({
                    id: "datatable",
                    container: "datatable",
                    view: "datatable",
                    columns: schema,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    columnWidth: 200,
                    data: docs
                  });
                }
              });
            });
          });
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:'
      }
    ]
  },
  {
    label: 'Development',
    submenu: [
      {
        label: 'Reload App',
        accelerator: 'CmdOrCtrl+R',
        click: function () {
          remote.getCurrentWindow().reload();
        }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: function () {
          remote.getCurrentWindow().toggleDevTools();
        }
      },
    ]
  }
];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);