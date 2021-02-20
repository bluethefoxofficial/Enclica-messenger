const { app, BrowserWindow, Menu, Tray } = require("electron");
var hide = 0;
let appIcon = null;
let win = null;
const path = require('path');
//const url = require('url')

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

app.on('ready',() =>  {
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

  splash = new BrowserWindow({width: 500, height: 300, transparent: true, frame: false, alwaysOnTop: false});
  
  splash.loadFile("./windows/preload.html");
  win.loadFile("./windows/login.html");
  win.once('ready-to-show', () => {
    splash.destroy();
    win.show();
  });

  win.on('minimize',function(event){
 
  win.on('close', function (event) {
    
        event.preventDefault();
        win.hide();
        hide = 1;
    
  });
  win.on('new-window', function(event, url){
    event.preventDefault();
    open(url);
  });
});
const path = require('path');
  appIcon = new Tray(path.resolve('assets','images','Global.ico'));
  //appIcon=new Tray("assets/images/Global.ico"); Invalid
  //appIcon.setHighlightMode('always'); THIS CAUSES A ERROR FOR SOME REASON.
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
