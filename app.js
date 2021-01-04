const { app, BrowserWindow, Menu, Tray } = require("electron");
var hide = 0;
let appIcon = null;
let win = null;
const menu = Menu.buildFromTemplate([
  {
    label: 'Quit',
    click() { app.quit(); process.exit();}
  },
  {
    label: 'Hide/show',
    click() {if(hide == 0){win.hide(); hide=1;}else{win.show();hide=0;}}
  },
]);

app.whenReady().then(() => {
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1080,
    height: 720,

    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      "page-visibility": true,
      webSecurity: true
    },
    icon: __dirname + "/assets/images/Enclica_logo_small.png"
  });
  win.loadFile("./windows/login.html");
  win.on('minimize',function(event){

    
   // win.hide();
   // hide = 1;
   // event.preventDefault();
  });
  
  win.on('close', function (event) {
    
        event.preventDefault();
        win.hide();
        hide = 1;
    
  });
  win.on('new-window', function(event, url){
    event.preventDefault();
    open(url);
  });
  appIcon = new Tray('assets/images/Enclica_logo_small.png');
  appIcon.setContextMenu(menu);
  appIcon.on('click', function (){
    win.show();
  });
  
  });

  app.on('open-url', function (event, data) {
    event.preventDefault();
    link = data;
  });
  app.on('window-all-closed', () => {
    app.quit();
  })
