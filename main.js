const electron = require('electron')
const createTray = require('./tray');

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {

    mainWindow = new BrowserWindow({width: 800, height: 600})
    mainWindow.loadURL("https://codeanywhere.com/editor/#")

    createTray(electron, mainWindow);

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