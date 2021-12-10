const { app, BrowserWindow, Menu, Tray } = require("electron");



function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};
//installer and runner

if (handleSquirrelEvent(app)) {
    return;
}

//app

var hide = 0;
let appIcon = null;
let win = null;
const path = require('path');
//const url = require('url')

const menu = Menu.buildFromTemplate([{
        label: 'Quit',
        click() {
            app.quit();
            process.exit();
        }
    },
    {
        label: 'Hide/show',
        click() {
            if (hide == 0) {
                win.hide();
                hide = 1;
            } else {
                win.show();
                hide = 0;
            }
        }
    },
]);


app.on('ready', () => {
    win = new BrowserWindow({
        width: 1080,
        height: 720,
        titleBarStyle: "hidden",
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            "page-visibility": true,
            webSecurity: true,
            enableRemoteModule: true
        },
        icon: __dirname + "/assets/images/Global.ico",
        show: false
    });

    splash = new BrowserWindow({ width: 500, height: 300, transparent: true, frame: false, alwaysOnTop: false });

    splash.loadFile("./windows/preload.html");
    win.loadFile("./windows/Welcome.html");
    win.once('ready-to-show', () => {
        splash.destroy();
        win.show();
    });

    win.on('minimize', function(event) {

        win.on('close', function(event) {

            event.preventDefault();
            win.hide();
            hide = 1;

        });
        win.on('new-window', function(event, url) {
            event.preventDefault();
            open(url);
        });
    });
    const path = require('path');

    appIcon = new Tray(path.join(__dirname, '/resources/icons/icon.png'));
    //appIcon=new Tray("assets/images/Global.ico"); Invalid
    //appIcon.setHighlightMode('always'); THIS CAUSES A ERROR FOR SOME REASON.
    appIcon.setContextMenu(menu);
    appIcon.on('click', function() {
        win.show();
    });

});

app.on('open-url', function(event, data) {
    event.preventDefault();
    link = data;
});
app.on('window-all-closed', () => {
    app.quit();
})