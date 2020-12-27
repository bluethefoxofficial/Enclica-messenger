
const is = require("electron-is");

function update(){
    document.getElementById('preloader').style.display = "block";
    console.log("downloading new client");

    if(is.windows() == true){
        console.log("get windows download package");

    }else if(is.linux() == true){
        console.log("get linx download package");


    }else if(is.macOS() == true){
        console.log("get mac download package");


    }else{
        console.log("UNKNOWN OS");
        document.getElementById('preloader').style.display = "none";
    }
}