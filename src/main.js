var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function () {

  var mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: true
  });

  mainWindow.loadUrl('file://' + __dirname + '/app.html');
  mainWindow.on("closed", function () {
    app.quit();
  });
});