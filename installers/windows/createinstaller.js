const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig() {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release/')

    return Promise.resolve({
        appDirectory: path.join(outPath, 'Enclica-win32-x64/'),
        authors: 'Enclica software',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'Enclica.exe',
        setupExe: 'Enclica-setup.exe',
        setupIcon: path.join(rootPath, 'assets', 'images', 'enclica_logo_small.ico')
    });
}