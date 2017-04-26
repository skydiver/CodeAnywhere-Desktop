module.exports = function (electron, mainWindow, iconPath) {

    const Tray = electron.Tray;
    const Menu = electron.Menu;

    var openAboutWindow = require('about-window').default;

    let appIcon = new Tray(iconPath);

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: function () {
                mainWindow.show();
            }
        },
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
            label: 'About',
            click: function() {
                openAboutWindow({
                    icon_path: iconPath,
                    copyright: 'Copyright (c) ' + new Date().getFullYear() + ' by Martin M.',
                    homepage: 'http://github.com/skydiver',
                })
            }
        },
        {
            label: 'Quit',
            accelerator: 'Command+Q',
            selector: 'terminate:',
            click: function () {
                electron.app.isQuiting = true;
                electron.app.quit();
            }
        }
    ]);

    appIcon.setToolTip('This is my application.');
    appIcon.setContextMenu(contextMenu);

};