// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow} = electron

'use strict';

const fs = require('fs');
var ipcMain = require('electron').ipcMain;

fs.readFile('foo.json', (err, data) => {  
    if (err) throw err;
    //let student = JSON.parse(data);
    global.sharedObj = JSON.parse(data);
    //console.log(student);
});

ipcMain.on('show-prop1', function(event) {
 // console.log(global.sharedObj.prop1);
});




    //console.log(student);

console.log('This is after the read call');  

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the properties for a full screen window to the viewport 
  // https://github.com/electron/electron/blob/master/docs/api/screen.md
  // todo, set this as a user defined but default property in an admin setup screen
const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  // Create the browser window.
  mainWindow = new BrowserWindow({width, height}) 

  // and load the index.html of the app.
  // todo: move the value of the starting UI location to a configuration admin screen
  mainWindow.loadURL(`file://${__dirname}/ui/admin/lobiadmin/version/1.0/ajax/index.html`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.