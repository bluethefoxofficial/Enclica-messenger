//
// client logout
//
//
function logout() {
    document.getElementById("preloader").style.display = "block";
    var logout = new Audio("../assets/sounds/mp3-converted/logout.mp3");
    logout.play();

    setTimeout((function() {
        localStorage.clear();
        window.location = "../windows/login.html";
    }), 1000);
}

//
//
//
// list groups
// grupy list
//
//
//

function listgroups() {
    document.getElementById("chatsnav").innerHTML = "";
    document.getElementById("chatsitem").innerHTML = "";
    var stuff =
        `https://${host}/api/api1.php?key=${api}&function=listgroups&token=` +
        localStorage.getItem("token");

    var sl = new XMLHttpRequest();
    sl.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {


            obj = JSON.parse(this.responseText);

            document.getElementById("chatsnav").innerHTML = "";
            document.getElementById("chatsitem").innerHTML = "";
            obj.forEach((function(data, index) {
                var random = Math.random(1, 99999999999);
                var list = "";
                members = data.members.split(" ");
                members.forEach((function(data, index) {
                    if (data == "") {
                        return;
                    }
                    list += `<div class='icon-container' style="clear: left;">
          <img style="float: right;"class="iconimg" src="https://csoftware.cf/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=pfpget&username=${data}" />
          <div class='statusmask'></div>
          <div class='status-circle'></div>
          <p class="membername">${data}</p>
          </div>`
                }));


                console.log(data);
                document.getElementById(
                    "chatsnav"
                ).innerHTML += `<a class="font-size: 10vw" id="btn_${data.ID}" class="activation" onclick='sectiondiv(event, "win_${data.ID}","0000","0000", ${data.ID})' >${data.name}</a>`;
                var ownermenu = `<!-- Not the owner of  ${data.name} sorry you can only leave mate. -->
        <button class="btn btn-danger" onclick="leave(${data.ID}); sectiondiv(event, 'chats',null,null); listgroups();" style="width: 90px;">Leave</button>
        `;
                if (username == data.owner) {
                    ownermenu = `
          <button class="btn btn-danger" onclick="deletegroup(${data.ID}); sectiondiv(event, 'chats',null,null)"  >Delete Server</button>
          <input type="text" placeholder="rename server" onkeydown="rename(${data.ID});"  style="width: 600px;"/>
          `;
                }
                document.getElementById("chatsitem").innerHTML += `
    <div class="main" id="win_${data.ID}">
    <div><h2>${data.name}</h2>
    <input type="file" class="file" id="attachment_${data.ID}" style="display: none;" onchange="fileSelected(this)"/>
    ${ownermenu}
    </div><p>Server invite code: <input type="text" value="${data.invite}" style="width: 200px;" disabled />
    </p>
    <div class="members" id="${data.ID}_members">
    ${list}
    </div>
    <div class="msg-container" id="${data.ID}_container">
            
    </div>
    <br/>
    <div class="flex"><textarea type="text" height="20px" style="width: 58%;" rows="1" class="auto_height" placeholder="Message" id="textbox_${data.ID}" onload="auto_height(this);" onKeyPress="sendmessage(event, this); "></textarea> <button style="height: 40px; width: 40px; inline: block; padding: 0px 0px;" onclick="document.getElementById('attachment_${data.ID}').click();" class="btn btn-info"><svg id="i-upload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <path d="M9 22 C0 23 1 12 9 13 6 2 23 2 22 10 32 7 32 23 23 22 M11 18 L16 14 21 18 M16 14 L16 29" />
</svg></button></div>
    </div>
    
    `;
                console.log(index);
            }));
        }
    };

    sl.open("GET", stuff, true);
    sl.send();
}
//
// SAVE CSS
//
//



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
        var refresh = new Audio("../assets/sounds/mp3-converted/noti2.mp3"); // shoutout to josephpham494 for spamming this down our fragile ears ;) even me a guy with ADD thinks this sounds is utterly fucking annoying to spam
        refresh.play();
    }
    silent = 1;
    document.getElementById("l1-968b").style.display = "block";
    var stuff =
        `https://${host}/api/api1.php?key=${api}&function=UAC&token=` +
        localStorage.getItem("token");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {


        if (this.readyState == 4 && this.status == 200) {
            setTimeout((function() {
                document.getElementById("rbtn").disabled = false;
                document.getElementById("l1-968b").style.display = "none";
                document.getElementById("preloader").style = "display: none;";
            }), 1000);
            obj = JSON.parse(this.responseText);
            currentmessages = this.responseText;

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
    evt.currentTarget.className += " active";
    getmessages();
}

//inital to the chats tab
sectiondiv(event, "chats","#ec6ead","#3494e6")