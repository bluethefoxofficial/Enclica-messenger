const installer = require('electron-installer-debian')

const options = {
    src: './',
    dest: './release/debian_amd64/',
    arch: 'amd64',
    icon: "./assets/images/enclica_logo_small.ico",
}

async function main(options) {
    console.log('Creating package (this may take a while)')
    try {
        await installer(options)
        console.log(`Successfully created package at ${options.dest}`)
    } catch (err) {
        console.error(err, err.stack)
        process.exit(1)
    }
}
main(options)