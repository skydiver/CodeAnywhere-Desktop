module.exports = function () {

    const trayMenu = require('./menus');
    const Tray = ModuleElectron.Tray;

    const contextMenu = trayMenu.trayContextMenu();
    const appIcon = new Tray(ModuleIconPath);
    appIcon.setToolTip('CodeAnywhere Desktop');
    appIcon.setContextMenu(contextMenu);

};