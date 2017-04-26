module.exports = function (electron, mainWindow) {

    const path = require('path');

    const Tray = electron.Tray
    const Menu = electron.Menu
    const iconPath = path.join(__dirname, 'favicon-152.png');

    let appIcon = new Tray(iconPath);

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: function () {
                mainWindow.show();
                mainWindow.toggleDevTools();
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Quit',
            accelerator: 'Command+Q',
            selector: 'terminate:',
            click: function () {
                electron.app.quit();
            }
        }
    ]);

    appIcon.setToolTip('This is my application.');
    appIcon.setContextMenu(contextMenu);

}