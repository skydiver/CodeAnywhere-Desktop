const electron = require('electron');
const config = require('./config.json');
const appMenu = require('./includes/menu');
const path = require('path');
const windowStateKeeper = require('electron-window-state');

let mainWindow;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const iconPath = path.join(__dirname, config.icon);

function createWindow() {

    /* Set default window dimensions */
    let mainWindowState = windowStateKeeper({
        defaultWidth: config.width,
        defaultHeight: config.height
    });

    /* Create main window */
    mainWindow = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,
        x: mainWindowState.x,
        y: mainWindowState.y,
        icon: iconPath
    });

    /* Set globals to use on Modules */
    global.ModuleElectron = electron;
    global.ModuleWindow = mainWindow;
    global.ModuleIconPath = iconPath;

    /* Load URL */
    mainWindow.loadURL(config.url);

    /* Show menubar */
    mainWindow.setMenu(appMenu.getMenuBar());

    /* Show tray icon */
    appMenu.doTrayIcon();

    /* Remember window state */
    mainWindowState.manage(mainWindow);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    /* Minimize to tray */
    mainWindow.on('minimize', function (event) {
        event.preventDefault();
        mainWindow.hide();
    });

    /* Close to tray */
    mainWindow.on('close', function (event) {
        if (!app.isQuiting) {
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