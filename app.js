const { app, BrowserWindow } = require('electron');
const path = require('path');
app.commandLine.appendSwitch('auto-detect', 'false');
app.commandLine.appendSwitch('no-proxy-server');
let win;

var IMG_DIR = '/assets/images/';
var APP_DIR = '/windows/';

app.on('ready',createwin);



function createwin(){
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    icon: path.join(__dirname, IMG_DIR, 'enclica_logo_small.png')
  });



}



app.on('window-all-closed',() => {

  if(process.platform !== 'darwin'){
    app.quit();
  }
});
