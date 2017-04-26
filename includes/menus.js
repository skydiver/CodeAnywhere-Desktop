module.exports = {

    trayContextMenu: function () {

        return ModuleElectron.Menu.buildFromTemplate([
            {
                label: 'Show App',
                click: function () {
                    ModuleWindow.show();
                }
            },
            {
                label: 'Toggle DevTools',
                accelerator: 'Alt+Command+I',
                click: function () {
                    ModuleWindow.show();
                    ModuleWindow.toggleDevTools();
                }
            },
            {
                type: 'separator'
            },
            this.menuAbout(),
            this.menuQuit()
        ]);

    },

    menuAbout: function () {
        return {
            label: 'About',
            click: function () {
                let openAboutWindow = require('about-window').default;
                openAboutWindow({
                    icon_path: ModuleIconPath,
                    copyright: 'Copyright (c) ' + new Date().getFullYear() + ' by Martin M.',
                    homepage: 'http://github.com/skydiver',
                })
            }
        };
    },

    menuQuit: function () {
        return {
            label: 'Quit',
            accelerator: 'Command+Q',
            selector: 'terminate:',
            click: function () {
                ModuleElectron.app.isQuiting = true;
                ModuleElectron.app.quit();
            }
        };
    }

};