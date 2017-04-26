const electron = require('electron');
const trayIcon = require('./tray');
const path = require('path');
const config = require('./config.json');

let mainWindow;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const iconPath = path.join(__dirname, config.icon);

function createWindow() {

    let bounds = electron.screen.getPrimaryDisplay().bounds;
    let x = bounds.x + ((bounds.width - config.width) / 2);
    let y = bounds.y + ((bounds.height - config.height) / 2);

    mainWindow = new BrowserWindow({
        width: config.width,
        height: config.height,
        x: x,
        y: y,
        icon: iconPath
    });

    mainWindow.loadURL("https://codeanywhere.com/editor/");

    /* Start maximized */
    if(config.maximized) {
        mainWindow.maximize();
    }

    /* Hide menubar */
    mainWindow.setMenu(null);

    /* Show tray icon */
    trayIcon(electron, mainWindow, iconPath);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    /* Minimize to tray */
    mainWindow.on('minimize',function(event){
        event.preventDefault();
        mainWindow.hide();
    });

    /* Close to tray */
    mainWindow.on('close', function (event) {
        if(!app.isQuiting){
            event.preventDefault();
            mainWindow.hide();
        }
        return false;
    });

}


app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});