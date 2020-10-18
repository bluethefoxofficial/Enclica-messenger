var currentmessages = null;
var silent = 1;
var username;
var numberofmessages = 0;
var call = null;
var nomessages = "";


var host;


var api;

if(localStorage.getItem("host")){
host =  localStorage.getItem("host");
api =  localStorage.getItem("ak");
}else{
  host = "csoftware.cf";
  api = "grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL";
}

document.getElementById("host").innerHTML = host;
// Get the modal

var modal = document.getElementById("create");
var currentserver = null;
// Get the button that opens the modal
var modalbtn = document.getElementById("create_btn");

// Get the <span> element that closes the modal
var modalspan = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
modalbtn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
modalspan.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function logout() {
 //document.getElementById("preloader").style.display = "block";
  var logout = new Audio("../assets/sounds/mp3-converted/logout.mp3");
  logout.play();

  setTimeout(function () {
    localStorage.clear();
    window.location = "../windows/login.html";
  }, 1000);
}

document.getElementById("chatoblock").click();
function sectiondiv(evt, sectiondiv, colour1, colour2, serverid) {
  currentmessages = null;
  silent = 1;
  if (serverid) {
    currentserver = serverid;
  }

  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("main");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("activation");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(sectiondiv).style.display = "block";
  evt.currentTarget.className += " active";
  getmessages();
}

const fs = require("fs");
function refreshprofile() {
  document.getElementById("rbtn").disabled = true;
  var silent = 0;
  if(silent != 1){
  var refresh = new Audio("../assets/sounds/mp3-converted/noti2.mp3");
  refresh.play();
  }
  silent = 1;
  document.getElementById("l1-968b").style.display = "block";
  var stuff =
    `https://${host}/api/api1.php?key=${api}&function=UAC&token=` +
    localStorage.getItem("token");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    console.log(stuff);

    if (this.readyState == 4 && this.status == 200) {
      setTimeout(function () {
        document.getElementById("rbtn").disabled = false;
        document.getElementById("l1-968b").style.display = "none";
        document.getElementById("preloader").style = "display: none;";
      }, 1000);
      obj = JSON.parse(this.responseText);
      currentmessages = this.responseText;
      console.log(obj);
      window.title = "Welcome to Encilica " + obj.username;
      document.getElementById("pfp").src =
        "https://www.gravatar.com/avatar/" + md5(obj.email) + "?s=32";
      document.getElementById("name").innerHTML = username;
      document.getElementById("bio").innerHTML = obj.bio;
      silent = 0;

    }
  };
  xhttp.open("GET", stuff, true);
  xhttp.send();
}


function savecss() {
  document.getElementById("cbtn").disabled = true;
  var refresh = new Audio("../assets/sounds/mp3-converted/noti3.mp3");
  refresh.play();
  document.getElementById("l1-968c").style.display = "block";
  console.log();
  const data = new Uint8Array(
    Buffer.from(document.getElementById("customcss").value)
  );
  fs.writeFile(
    __dirname + "/../assets/configurable/custom.css",
    data,
    (err) => {
      if (err) console.log(err);
      console.log("The file has been saved!");

      setTimeout(function () {
        location.reload();
      }, 1000);
    }
  );
}


function joinserver() {
  if (sevmax == 100) return;
  var server = currentserver;
  var stuff =
    `https://${host}/api/api1.php?key=${api}&function=joingroup&token=` +
    localStorage.getItem("token") +
    "&invite=" +
    document.getElementById("serverjoininputbox").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    console.log(stuff);

    if (this.readyState == 4 && this.status == 200) {
      setTimeout(function () {
        document.getElementById("l1-968b").style.display = "none";
        document.getElementById("preloader").style = "display: none;";
      }, 1000);
      obj = JSON.parse(this.responseText);
      console.log(obj);
      if (obj.code === 568999) {
        var errornoti = new Audio("../assets/sounds/mp3-converted/denied1.mp3");
        error.setAttribute("crossorigin", "anonymous");
        error.play();

        const error = new Notification(" Encilica Error", {
          body: obj.error,
          silent: true,
          icon: "../assets/images/icons/warning.png",
        });
      } else {
        listgroups();
      }
    }
  };
  xhttp.open("GET", stuff, true);
  xhttp.send();
}

function listgroups() {
  document.getElementById("chatsnav").innerHTML = "";
  document.getElementById("chatsitem").innerHTML = "";
  var stuff =
    `https://${host}/api/api1.php?key=${api}&function=listgroups&token=` +
    localStorage.getItem("token");
  console.log(stuff);
  var sl = new XMLHttpRequest();
  sl.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      
      obj = JSON.parse(this.responseText);
      console.log(obj);
      document.getElementById("chatsnav").innerHTML = "";
      document.getElementById("chatsitem").innerHTML = "";
      obj.forEach(function (data, index) {
        var random = Math.random(1, 99999999999);
        var list = "";
        members = data.members.split(" ");
        members.forEach(function (data, index){
          if(data == ""){return;}
          list += `<p class="membername"><div class='icon-container' style="clear: left;">
          <img style="float: right;"class="iconimg" src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png" />
          <div class='status-circle'>
          </div>
        </div></p>`;
        });

        
        console.log(data);
        document.getElementById(
          "chatsnav"
        ).innerHTML += `<a class="font-size: 10vw" id="btn_${data.ID}" class="activation" onclick='sectiondiv(event, "win_${data.ID}","0000","0000", ${data.ID})' >${data.name}</a>`;
        var ownermenu = `<!-- Not the owner of  ${data.name} sorry you can only leave mate. -->
        <button class="btn btn-danger" onclick="leave(${data.ID}); sectiondiv(event, 'chats',null,null); listgroups();" style="width: 90px;">Leave</button>
        `;  
        if(username == data.owner){
          ownermenu = `
          <button class="btn btn-danger" onclick="deletegroup(${data.ID}); sectiondiv(event, 'chats',null,null)"  >Delete Server</button>
          <input type="text" placeholder="rename server" onkeydown="rename(${data.ID});"  style="width: 600px;"/>
          `;
        }
        document.getElementById("chatsitem").innerHTML += `
    <div class="main" id="win_${data.ID}">
    <div><h2>${data.name}</h2>
    ${ownermenu}
    </div><p>Server invite code: <input type="text" value="${data.invite}" style="width: 200px;" disabled />
    </p>
    <div class="members" id="${data.ID}_members">
    ${list}
    </div>
    <div class="msg-container" id="${data.ID}_container">
            
    </div>
    <br/>
    <textarea type="text" height="20px" style="width: 58%;" rows="1" class="auto_height" placeholder="Message" id="textbox_${data.ID}" onload="auto_height(this);" onKeyPress="sendmessage(event, this); "></textarea> <button style="height: 40px; width: 40px; inline: block; padding: 0px 0px;" class="btn btn-info"><svg id="i-upload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <path d="M9 22 C0 23 1 12 9 13 6 2 23 2 22 10 32 7 32 23 23 22 M11 18 L16 14 21 18 M16 14 L16 29" />
</svg></button>
    </div>
    
    `;
        console.log(index);
      });
    }
  };

  sl.open("GET", stuff, true);
  sl.send();
}
listgroups();
function Encilicadirect() {
  const msg = new Notification(" Encilica Error", {
    body:
      "Encilica direct requires you to run it seprately from here note from dev build 1.5 Encilica direct will no longer be supported.",
    silent: false,
    icon: "../assets/images/icons/info.png",
  });
}
var sevmax = 0;
function removeElement(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}
var md5 = require("md5");
var os = require("os");
var obj;
var email;
var username;
if (!localStorage.getItem("token")) {
  window.location = "../windows/login.html";
}
console.log("%cWARNING!!!", "font-size: 40px; color: RED");
console.log(
  "%cnever tell anyone your password or token,\nwe would never message you asking for your password or token.",
  "font-size: 20px; color: #FA34B5"
);
var stuff =
  `https://${host}/api/api1.php?key=${api}&function=UAC&token=` +
  localStorage.getItem("token");
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("preloader").style = "display: none;";
    obj = JSON.parse(this.responseText);
    console.log(obj);
    window.title = "Welcome to Encilica " + obj.username;
    username = obj.username;
    document.getElementById("usernametext").innerHTML = obj.username;
    document.getElementById("pfp").src =
      "https://www.gravatar.com/avatar/" + md5(obj.email) + "?s=32";
    document.getElementById("name").innerHTML = username;
    document.getElementById("bio").innerHTML = obj.bio;
    document.getElementById("l1-968b").style = "display: none;";
  }
  const fs = require("fs");
  function readFile(filepath) {
    fs.readFile(filepath, "utf-8", function (err, data) {
      if (err) {
        alert("An error ocurred reading the file :" + err.message);
        return;
      }
      document.getElementById("customcss").innerHTML = data;
    });
  }
  readFile(__dirname + "/../assets/configurable/custom.css");
};
xhttp.open("GET", stuff, true);
xhttp.send();

function removeElement(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}
var md5 = require("md5");
const { getServers } = require("dns");
var obj;
var email;
var username;
if (!localStorage.getItem("token")) {
  window.location = "../windows/login.html";
}

function devmode() {
  console.log("Dev mode activated goto settings then UITEST.");
  document.getElementById("uitest").style.display = "block";
}
function linkify(inputText) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  );

  return replacedText;
}
function getmessages() {
  if (currentserver === null) {
    return;
  }

  var stuff =
    `https://${host}/api/api1.php?key=${api}&function=getmessages&token=` +
    localStorage.getItem("token") +
    "&serverid=" +
    currentserver;
  console.log(stuff);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    var obj = null;
    if (this.readyState == 4 && this.status == 200) {
try{
      obj = JSON.parse(this.responseText);
}catch(e){
  if(nomessages) return;
  document.getElementById(currentserver + "_container").innerHTML ="";
    document.getElementById(currentserver + "_container").innerHTML +=
    `<svg id="i-msg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="50" height="50" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <path d="M2 4 L30 4 30 22 16 22 8 29 8 22 2 22 Z" />
</svg><h3>This server is alittle empty. Let start a conversation</h3>`;
    nomessages = 1;
    return;
}
nomessages = 0;
      if (this.responseText == currentmessages) {
        return;
      }
      if (currentmessages == "") {
        return;
      }
      if (currentserver == obj[0].serverid) {
        if (
          document.getElementById(currentserver + "_container").innerHTML != ""
        ) {
          if (silent == 1) {
          } else {
            var newmsg = new Audio(
              "../assets/sounds/mp3-converted/message.mp3"
            );
            newmsg.play();
          }
        }
      }
      //console.log(this.responseText);
      document.getElementById(currentserver + "_container").innerHTML = "";
      document.getElementById(currentserver + "_container").innerHTML = "";
      currentmessages = this.responseText;
     
      obj.forEach(function (data, index) {
        // document.getElementById(currentserver + "_container").innerHTML = ""; debug
        if(data.sender == username){
          document.getElementById(currentserver + "_container").innerHTML +=
          "<div class='msg sender'><p style='color: rgba(0,0,0,1); font-size: 12px;'>" +
          data.sender + " | " + timeConverter(data.time) +
          "</p><p>" +
          linkify(data.message) +
          "</p></div>\n";
        }else{
        document.getElementById(currentserver + "_container").innerHTML +=
        "<div class='msg'><p style='color: rgba(0,0,0,1); font-size: 12px;'>" +
        data.sender + " | " + timeConverter(data.time) +
        "</p><p>" +
        linkify(data.message) +
        "</p></div>\n";
        }
        document.getElementById(
          currentserver + "_container"
        ).scrollTop = document.getElementById(
          currentserver + "_container"
        ).scrollHeight;
        silent = 0;
        //console.log(index);
      });
    } else {
    }
  };

  xhttp.open("GET", stuff, true);
  xhttp.send();
  console.log("RECEIVED hopefully");
}

window.setInterval(function () {
  getmessages();
}, 1000);

function sendmessage(e, input) {

 
  var code = e.keyCode ? e.keyCode : e.which;

  if (code == 13) {
    e.preventDefault();
    //Enter keycode
    //insert csoftware send message code here.

    if (input.value.startsWith("/")) {
      commandhandler(input,"");
      return;
    }
    if(numberofmessages == 10){
      document.getElementById("spam").style.display = "block";
      return;
    }
    if(input.value == ""){
      var newmsg = new Audio(
        "../assets/sounds/mp3-converted/denied1.mp3"
      );
      newmsg.play();
      document.getElementById(currentserver + "_container").innerHTML +=
      "<div class='msg'><p style='color: rgba(255,255,0,1); font-size: 12px;'>SYSTEM</p><p>You cant send a blank message. (this message is only viewable by you. This message will hide when someone sends a mesage to the server.)</p></div>\n";
      input.value = "";
      input.innerHTML = "";
  
      
      return;
      
  
    }


    var stuff = `https://${host}/api/api1.php`;
    console.log(stuff);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        silent = 1;
        getmessages();
      } else {
      }
    };

    xhttp.open("POST", stuff, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
      `key=${api}&function=sendmessage&token=` +
        localStorage.getItem("token") +
        "&serverid=" +
        currentserver +
        "&message=" +
        input.value
    );
    input.value = "";
    numberofmessages += 1;
  }
}

function createserver() {
  var input = document.getElementById("name_creation");
  if (input.value == "") {
    return;
  }
  var stuff =
    `https://${host}/api/api1.php?key=${api}&function=creategroup&token=` +
    localStorage.getItem("token") +
    "&name=" +
    input.value;
  console.log(stuff);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      silent = 1;
      listgroups();
      modal.style.display = "none";
    } else {
      console.log(this.responseText.toString());
      console.log("error");
      console.log(this.readyState.toString());
      console.log(this.status.toString());
    }
  };

  xhttp.open("GET", stuff, true);
  xhttp.send();
}










//leave server via the client


function leave(id){
  var stuff =
  "https://csoftware.cf/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=leavegroup&token=" +
  localStorage.getItem("token") +
  "&serverid=" +
  id;
console.log(stuff);
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    silent = 1;
    var leave = new Audio(
      "../assets/sounds/mp3-converted/noti7.mp3"
    );
    leave.play();
    listgroups();
    const error = new Notification("Server message", {
      body: "You just left a server. If this wasnt you check to see if you have a virus.",
      silent: true,
      icon: "../assets/images/icons/info_2.png",
    });

  } else {
    console.log(this.responseText.toString());
    console.log("error");
    console.log(this.readyState.toString());
    console.log(this.status.toString());
  }
};

xhttp.open("GET", stuff, true);
xhttp.send(); 
}

function deletegroup(id){
  var stuff =
  `https://${host}/api/api1.php?key=${api}&function=deletegroup&token=` +
  localStorage.getItem("token") +
  "&serverid=" +
  id;
console.log(stuff);
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    silent = 1;
    var leave = new Audio(
      "../assets/sounds/mp3-converted/noti7.mp3"
    );
    leave.play();
    listgroups();
    const error = new Notification("Server message", {
      body: "You just deleated a server. If this wasnt you check to see if you have a virus.",
      silent: true,
      icon: "../assets/images/icons/info.png",
    });

  } else {
    console.log(this.responseText.toString());
    console.log("error");
    console.log(this.readyState.toString());
    console.log(this.status.toString());
  }
};

xhttp.open("GET", stuff, true);
xhttp.send(); 
}

require('../renderer.js');
listgroups();


function commandhandler(input, messagecontainer){



if(input == "/help"){
  alert("WIP");
}
else if(input == "/shrug"){
  input = "¯\\_(ツ)_/¯";
  console.log("shrug command");
}
}



function spamprevention(){

  numberofmessages = 0;

  setTimeout(spamprevention,5000);
}
spamprevention();

function dismissspam(){
  document.getElementById("spam").style.display = "none";
}
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}