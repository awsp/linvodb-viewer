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
            operation.loadDoc(fileDir[0], LinvoDB, webix);
          });
        }
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+D',
        click: function () {
          operation.reloadDoc();
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