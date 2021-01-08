var ver = "AUDIO/VIDEO PLAYER VERSION 1.0";

var audioplayer = document.getElementById("playing");
var videoplayer = document.getElementById("videoplayer");
var currentsystem = "";
var currentlyplay = document.getElementById("cupl");
var currentlyplayingbtn = document.getElementById("cup");
currentlyplayingbtn.style.display = "none";
function play(src, type = "audio"){

    
    if(type == "audio"){

    videoplayer.style.display = "none";
    audioplayer.style.display = "block";
    audioplayer.src = src;
    audioplayer.play();
    currentlyplayingbtn.style.display = "block";
    videoplayer.style.display = "none";
    stop();
    currentsystem = "audio";
    sectiondiv(event, "currentlyplaying","#00a2ff","#ab34e6")
    currentlyplay.innerHTML = src.split(/_(.+)/)[1];
    }else if(type == "video"){
        
    videoplayer.style.display = "block";
    audioplayer.style.display = "none";
    videoplayer.src = src;
    videoplayer.play();
    currentlyplayingbtn.style.display = "block";
    stop();
    currentsystem = "video";
    sectiondiv(event, "currentlyplaying","#00a2ff","#ab34e6")
    currentlyplay.innerHTML = src.split(/_(.+)/)[1];
    }else{
        swal("ERROR", `${type} does not exist as a type of file`, "error");
    }


}

function stop(){
    if(currentsystem == "audio"){
        audioplayer.pause();
        audioplayer.currentTime = 0;
    }else if(currentsystem == "video"){
        videoplayer.pause();
        videoplayer.currentTime = 0;
    }
}
function pause(){
    if(currentsystem == "audio"){
        audioplayer.pause();
    }else if(currentsystem == "video"){
        videoplayer.pause();
    }
}
function shoottostart(){
    if(currentsystem == "audio"){
        audioplayer.currentTime = 0;
    }else if(currentsystem == "video"){
        videoplayer.currentTime = 0;
    }
}
function apclose(){
    stop();
    currentlyplayingbtn.style.display = "none";
    sectiondiv(event, "chats","#00a2ff","#ab34e6")
}