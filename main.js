const electron = require('electron')
const trayIcon = require('./tray');

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const iconPath = path.join(__dirname, 'favicon-152.png');

let mainWindow

function createWindow() {

    mainWindow = new BrowserWindow({width: 800, height: 600, icon: iconPath})
    mainWindow.loadURL("https://codeanywhere.com/editor/#")

    trayIcon(electron, mainWindow, iconPath);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})