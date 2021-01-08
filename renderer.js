console.log("HELLO WORLD FROM THE RENDERERRRRRRRRRRRRRRRRRRRRRRRRRR.");



const { Color } = require('custom-electron-titlebar');
//titlebar code
const customTitlebar = require('custom-electron-titlebar');
 
new customTitlebar.Titlebar({
    icon: "../assets/images/Enclica_logo_small.png",
    menu: false
});
customTitlebar.updateBackground(new Color(new RGBA(0, 0, 0, .3)));