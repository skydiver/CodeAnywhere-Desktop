const electron = require('electron');
const config = require('./config.json');
const appMenu = require('./includes/menu');
const path = require('path');
const url = require('url');
const windowStateKeeper = require('electron-window-state');

let mainWindow;
let Tray;

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
    //mainWindow.loadURL(config.url);   // DISABLED FOR NOW ...
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    /* Show menubar */
    mainWindow.setMenu(appMenu.getMenuBar());

    /* Show tray icon */
    Tray = electron.Tray;
    let contextMenu = appMenu.getTrayMenu();
    let appIcon = new Tray(iconPath);
    appIcon.setToolTip('CodeAnywhere Desktop');
    appIcon.setContextMenu(contextMenu);

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