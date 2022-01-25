const { getJSON } = require("jquery");

//fixed audio spamming when someone spams shit.
var refresh = new Audio("../assets/sounds/mp3-converted/noti2.mp3");
var logout = new Audio("../assets/sounds/mp3-converted/logout.mp3");
var seobj;
var log = false;


//
//
//
// list groups
// grupy list SPELLING ERROR
//
//
//


function listgroups() {

    document.getElementById("chatsnav").innerHTML = "";
    document.getElementById("chatsitem").innerHTML = "";
    var stuff =
        `https://enclica.com/api/?&function=listgroups&token=` +
        localStorage.getItem("token");
    if (log == true) {
        console.log(stuff);

    }



    $.getJSON(stuff, function(result) {
        $.each(result, function(index, data) {
            var random = Math.random(1, 99999999999);
            var list = "";
            members = data.members.split(" ");

            members.forEach((function(user, index) {
                if (user == "") {
                    return;
                }
                if (username == data.owner) {
                    list += `<div class='icon-container' style="clear: left;">
                            <img style="float: right;"class="iconimg" src="https://enclica.com/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=pfpget&username=${user}" />
                            <div class='statusmask'></div>
                            <div class='status-circle'></div>
                            <p class="membername">${user}</p>
                            </div>
                            <!-- context menu -->
                            <div class="menu">
            <ul class="menu-options">
            <li class="menu-option">Back</li>
            <li class="menu-option">Reload</li>
            <li class="menu-option">Save</li>
            <li class="menu-option">Save As</li>
            <li class="menu-option">Inspect</li>
            </ul>
            </div>`;


                } else {


                    list += `<div class='icon-container' style="clear: left;">
              <img style="float: right;"class="iconimg" src="https://enclica.com/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=pfpget&username=${user}" />
              <div class='statusmask'></div>
              <div class='status-circle'></div>
              <p class="membername">${user}</p>
              </div>`;
                }
            }));


            //  console.log(data);
            document.getElementById("chatsnav").innerHTML += `<a class="font-size: 10vw" id="btn_${data.ID}" class="activation" onclick='sectiondiv(event, "win_${data.ID}","0000","0000", ${data.ID})' >${data.name}</a>`;
            var ownermenu = `<!-- Not the owner of  ${data.name} sorry you can only leave mate. -->
            <ul class="ul">
            <li class="li"><p>${data.name}</p></li>
           
            <li class="li"><a onclick="leave(${data.ID}); sectiondiv(event, 'chats',null,null); listgroups();" href="#"><b>Leave Server</b></a></li>
            <li class="li"><a href="#" onclick="report(${data.ID});"><b>Report server</b></a></li>
            <li class="li"><p>Server invite code: ${data.invite}</p></li>
            </ul>
            
            `;
            if (username == data.owner) {
                ownermenu = `
                        <ul class="ul">
                        <li class="li"><p>${data.name}</p></li>
                        <li class="li"><a onclick="document.getElementById('${data.ID}').style.display = 'block';" href="#"><b>Server manager</b></a></li>
                     
                        <li class="li"><p>Server invite code: ${data.invite}</p></li>
                      </ul>
                      <!-- The Modal for ${data.name} -->
            <div id="${data.ID}" class="modal">
            
            <!-- Modal content -->
            <div class="modal-content" style="height: 100%;">
            <div class="modal-header bg-primary">
            <span class="close" onclick="document.getElementById('${data.ID}').style.display = 'none';">&times;</span>
            <h2>${data.name}</h2>
            </div>
            <div class="modal-body">
            
            <button class="btn btn-danger" style="width: 100px;" onclick="deletegroup(${data.ID});"  >Delete Server</button>
            <h3>Community</h3>
            <button class="btn btn-info" onclick="return null;"  >Submit for community reviews</button>
            
            </div>
            </div>
            
            </div>
              `;
            }

            document.getElementById("chatsitem").innerHTML += `
            <div class="main " style="display:none;" id="win_${data.ID}">
            <div>
            <input type="file" class="file" id="attachment_${data.ID}" style="display: none;" onchange="fileSelected(this)"/>
            ${ownermenu}
            </div>
            </p>
            <div class="members" id="${data.ID}_members">
            ${list}
            </div>
            <div >
            <div class="msg-container" id="${data.ID}_scroll">
            <div id="${data.ID}_container">
            </div>
            </div>
            <textarea type="text" height="20px" style="width: 60%; display:absolute;" rows="1" class="auto_height" placeholder="Message" id="textbox_${data.ID}" onload="auto_height(this);" onKeyPress="sendmessage(event, this); "></textarea> 
            
            <button style="display:inline-block; vertical-align: top;" onclick="document.getElementById('attachment_${data.ID}').click();" class="btn btn-info"><svg id="i-upload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M9 22 C0 23 1 12 9 13 6 2 23 2 22 10 32 7 32 23 23 22 M11 18 L16 14 21 18 M16 14 L16 29" />
            </svg></button>
            
            </div>
            </div>

            
            `;

        });
    });










}
//
// SAVE CSS
//
//



function savecss() {
    document.getElementById("cbtn").disabled = true;
    refresh.play();
    document.getElementById("l1-968c").style.display = "block";
    // console.log();
    const data = new Uint8Array(
        Buffer.from(document.getElementById("customcss").value)
    );
    fs.writeFile(
        __dirname + "/../assets/configurable/custom.css",
        data,
        (err) => {
            if (err) console.log(err);
            console.log("The file has been saved!");

            setTimeout((function() {
                location.reload();
            }), 1000);
        }
    );
}








//
// refresh user profile
//
//
//

function refreshprofile() {
    document.getElementById("rbtn").disabled = true;
    var silent = 0;
    if (silent != 1) {
        refresh.play();
    }
    silent = 1;
    document.getElementById("l1-968b").style.display = "block";
    var stuff =
        `https://enclica.com/api/api1.php?key=${api}&function=UAC&token=` +
        localStorage.getItem("token");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {


        if (this.readyState == 4 && this.status == 200) {
            setTimeout((function() {
                document.getElementById("rbtn").disabled = false;
                document.getElementById("l1-968b").style.display = "none";
                document.getElementById("preloader").style = "display: none;";
            }), 1000);
            obj = this.responseText;
            currentmessages = this.responseText;

            window.title = "Welcome to Enclica messenger " + obj.username;
            document.getElementById("pfp").src =
                "https://www.gravatar.com/avatar/" + md5(obj.email) + "?s=32";
            document.getElementById("name").innerHTML = username;
            document.getElementById("bio").innerHTML = obj.bio;
            global.username = username;
            silent = 0;

        }
    };
    xhttp.open("GET", stuff, true);
    xhttp.send();
}


//section div (tab controller)
//
//
//
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
    if (!evt) return;
    if (evt.currentTarget.className.includes("btn")) { return; }
    evt.currentTarget.className += " active";
    getmessages();
}

//inital to the chats tab
sectiondiv(event, "chats", "#ec6ead", "#3494e6")


//scroll to bottom

function scrollToBottom(id) {
    try {
        var div = document.getElementById(id);
        div.scrollTop = div.scrollHeight - div.clientHeight;
    } catch (e) {

    }
}

//dev command
function unloadcss() {
    document.getElementsByTagName('link')[0].disabled = true;
    document.getElementsByTagName('link')[1].disabled = true;
    document.getElementsByTagName('link')[2].disabled = true;
    document.getElementsByTagName('link')[3].disabled = true;
    document.getElementsByTagName('link')[4].disabled = true;
    document.getElementsByTagName('link')[5].disabled = true;
}
//dev command
function reloadcss() {
    document.getElementsByTagName('link')[0].disabled = false;
    document.getElementsByTagName('link')[1].disabled = false;
    document.getElementsByTagName('link')[2].disabled = false;
    document.getElementsByTagName('link')[3].disabled = false;
    document.getElementsByTagName('link')[4].disabled = false;
    document.getElementsByTagName('link')[5].disabled = false;
}
//
// client logout
//
//
reloadcss();

function userinformation() {

    console.log("USER INFO INIT.");
    $.get("https://enclica.com/api/user/info/sigular/", { token: localStorage.getItem("token") }, function(d) {
        console.log(d);
        username = d.username;

    });
}

userinformation();