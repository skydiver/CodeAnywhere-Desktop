module.exports = {

    getMenuBar: function () {
        return ModuleElectron.Menu.buildFromTemplate([{
            label: 'CodeAnywhere',
            submenu: [
                this.menuAbout(),
                this.menuQuit()
            ]
        }]);
    },

    getTrayMenu: function () {

        return ModuleElectron.Menu.buildFromTemplate([
            {
                label: 'Show App',
                click: function () {
                    ModuleWindow.show();
                }
            },
            // {
            //     label: 'Toggle DevTools',
            //     accelerator: 'Alt+Command+I',
            //     click: function () {
            //         ModuleWindow.show();
            //         ModuleWindow.toggleDevTools();
            //     }
            // },
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
                    win_options: {
                        maximizable: false,
                        minimizable: false,
                        resizeable: false
                    }
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