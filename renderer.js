const { Color } = require('custom-electron-titlebar');
//titlebar code it kind of works but not.
const customTitlebar = require('custom-electron-titlebar');

const tb = new customTitlebar.Titlebar({
    icon: '../resources/icons/icon.png',
    backgroundColor: Color.BLACK,

});

tb.updateMenu(null);

tb.backgroundColor = Color.RED;