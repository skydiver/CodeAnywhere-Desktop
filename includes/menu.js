module.exports = {

    getMenuBar: function () {
        return ModuleElectron.Menu.buildFromTemplate([
            {
                'label': 'File',
                submenu: [
                    this.menuQuit()
                ]
            },
            {
                'label': 'View',
                submenu: [
                    {role: 'reload'},
                    {role: 'forcereload'},
                    {type: 'separator'},
                    {role: 'togglefullscreen'},
                    {role: 'resetzoom'},
                    {role: 'zoomin'},
                    {role: 'zoomout'},
                ]
            },
            {
                label: 'Page',
                submenu: [
                    {
                        label: 'Logout',
                        click: function () {
                            ModuleWindow.loadURL("https://codeanywhere.com/logout");
                        }
                    },
                ]
            },
            {
                label: 'Help',
                submenu: [
                    this.menuDevTools(),
                    {type: 'separator'},
                    this.menuAbout(),
                ]
            }
        ]);
    },

    getTrayMenu: function () {

        return ModuleElectron.Menu.buildFromTemplate([
            {
                label: 'Show Window',
                click: function () {
                    ModuleWindow.show();
                }
            },
            {type: 'separator'},
            this.menuAbout(),
            this.menuQuit()
        ]);

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
            // accelerator: 'Command+Q',
            selector: 'terminate:',
            click: function () {
                ModuleElectron.app.isQuiting = true;
                ModuleElectron.app.quit();
            }
        };
    },

    menuDevTools: function () {
        return {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: function () {
                ModuleWindow.show();
                ModuleWindow.toggleDevTools();
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