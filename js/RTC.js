var Peer = require('simple-peer')
var declined = new Audio("../assets/sounds/mp3-converted/declined_call.mp3");
var connecting = new Audio("../assets/sounds/mp3-converted/connecting_call.mp3");
var globalstream = null
var Peer = require('simple-peer');

const p = new SimplePeer({
  initiator: location.hash === '#1',
  trickle: false
})

p.on('error', err => console.log('error', err))

p.on('signal', data => {
  console.log('SIGNAL', JSON.stringify(data))
  document.querySelector('#outgoing').textContent = JSON.stringify(data)
})



p.on('connect', () => {
  console.log('CONNECT')
  p.send('whatever' + Math.random())
})

p.on('data', data => {
  console.log('data: ' + data)
})

function joincall(){

}

function declinecall(){

}

function makecall(){

  if(document.getElementById("rrtcid").value == ""){
    declined.play();
    swal({
      title: "No RTC id provided.",
      text: "please place a RTC id",
      icon: "error",
     });       
     return false; 
}
  
  location.hash = '#1'
//audio sound
    window.location = "main.html#1";

    connecting.play();


document.getElementById("currentcall_btn").style.display = "block";
sectiondiv(event, "currentcall","#ec6ead","#3494e6");
    return true;

}

function endcall(){
  
document.getElementById("currentcall_btn").style.display = "none";
sectiondiv(event, "chats","#ec6ead","#3494e6");

    Peer.destroy();
    return true;
}

function initialdiscover(){

}

function reportcall(){
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to report this caller to CSOFTWARE for review.",
        icon: "warning",
        buttons: [
          'No, cancel it!',
          'Yes, I am sure!'
            ]});        
}

function RTCuserID(input){
    //get the user accoutn and set it as the USERS RTC ID for calling other people THIS ID IS SHARED AROUND AND CURRENTLY CANT BE CHANGED!!!!
    //csoftware staff notice: FROM THE CSOFTWARE DEV TEAM THIS WILL BE ADDED IN V5.6 OF THE WEBSITE GOTO USER ACCOUNT AND CLICK CHANGE ID WHEN ADDED.
}

//
//
//this is a future addition.
//
//