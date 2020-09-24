const { app, BrowserWindow } = require("electron");
const storage = require("electron-localstorage");

 

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1080,
    height: 720,
    icon: __dirname + "/assets/images/Enclica logo.png",
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      webSecurity: false
    },
  });

  // and load the index.html of the app.
  //win.setMenu(null);
  win.loadFile("./windows/login.html");
}

app.whenReady().then(createWindow);
