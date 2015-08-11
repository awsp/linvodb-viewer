LinvoDB Viewer @version 0.4.1
--------------------------------------------------------------------------------
A very simple tool to visualize data from [LinvoDB3](https://github.com/Ivshti/linvodb3) Engine, by simple drag-n-drop. Built on Electron.
 


#### Build Instructions
Mac OS X
```
$ electron-packager ./src "LinvoDB Viewer" --platform=darwin --arch=x64 --version=0.30.2 --out=./build/ --asar --icon=resources/app.icns 
```

Windows
```
$ electron-packager ./src "LinvoDB Viewer" --platform=win32 --arch=x64 --version=0.30.2 --out=./build/ --asar --icon=resources/app.ico 
```

#### TODO
- Ability to add/remove/modify entity
- Multiple windows / tabs
- Gulp build script
- Queries support
- Filtering
- Watch db changes / refresh