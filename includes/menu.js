module.exports = {

    getMenuBar: function () {
        return ModuleElectron.Menu.buildFromTemplate([{
            label: 'CodeAnywhere',
            submenu: [
                {
                    label: 'Logout',
                    click: function () {
                        ModuleWindow.loadURL("https://codeanywhere.com/logout");
                    }
                },
                this.menuSeparator(),
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
            this.menuSeparator(),
            this.menuAbout(),
            this.menuQuit()
        ]);

    },

    menuSeparator: function () {
        return { type: 'separator' }
    },

    menuAbout: function () {
        return {
            label: 'About',
            click: this.aboutWindow
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
    },
    
    aboutWindow: function () {
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
        });
    },

};