
const is = require("electron-is");
const { app } = require("electron");
const { default: swal } = require("sweetalert");

    document.getElementById('preloader').style.display = "block";
    console.log("downloading new client");

    if(is.windows() == true){
        console.log("get windows download package");
        shell.openExternal("https://enclica.cf/download.php?p=win");
        app.quit();
       process.exit();

    }else if(is.linux() == true){
        console.log("get linux download package");
        shell.openExternal("https://enclica.cf/download.php?p=linux");
        app.quit();
        process.exit();


    }else if(is.macOS() == true){
        console.log("get mac download package");
        shell.openExternal("https://enclica.cf/download.php?p=darwin");
        app.quit();
        process.exit();
    }else{
        console.log("UNKNOWN OS"); //if someone sees this then they must be high and using some obscure OS possibly BSD based.
        document.getElementById('preloader').style.display = "none";
        swal("error when updating", "We dont know your operating system... Wait how are you running this?"); //this is what we ask them because we would want to know what shit they are using.
    }



//TODO: add forest os to the crack list.