const createDMG = require('electron-installer-dmg');
buildDMG();
async function buildDMG() {
    var path = require('path');
    var rootPath = './';
    await createDMG({
        appPath: path.join(__dirname, 'release/Enclica-darwin-x64/Enclica.app'),
        name: 'Enclica messenger',
        src: './',
        icon: path.join(rootPath, 'assets', 'images', 'enclica_logo_small.ico'),
        background: path.join(rootPath, 'assets', 'images', 'dmg_background.png')
    });
}