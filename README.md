LinvoDB Viewer
--------------------------------------------------------------------------------
A very simple tool to visualize data from [LinvoDB3](https://github.com/Ivshti/linvodb3) Engine, by simple drag-n-drop. Built on Electron.
 


#### Build Instructions
Mac OS X
```
$ electron-packager ./src "LinvoDB Viewer" --platform=darwin --arch=x64 --version=0.30.2 --out=./build/ --icon=resources/app.icns --asar
```

Windows
```
$ electron-packager ./src "LinvoDB Viewer" --platform=win32 --arch=x64 --version=0.30.2 --out=./build/ --icon=resources/app.ico --asar
```