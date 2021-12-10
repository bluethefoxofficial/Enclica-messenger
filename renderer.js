const { Color } = require('custom-electron-titlebar');
//titlebar code it kind of works but not.
const customTitlebar = require('custom-electron-titlebar');


const tb = new customTitlebar.Titlebar({
    icon: "../assets/images/Enclica_logo_small.png",
    backgroundColor: Color.BLUE,
});
//customTitlebar.updateBackground(new Color(new RGBA(0, 0, 0, .3))); //rgba is not working here, what the fuck.
tb.backgroundColor = Color.RED;

function color(tbc) {
    tb.backgroundColor = Color.fromHex(tbc);

}
//const update = require('/js/update.js');