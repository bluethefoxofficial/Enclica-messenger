//
// join server function
//
//
//
//

function joinserver() {
    if (sevmax == 100) return;
    var server = currentserver;
    var stuff =
        `https://${host}/api/api1.php?key=${api}&function=joingroup&token=` +
        localStorage.getItem("token") +
        "&invite=" +
        document.getElementById("serverjoininputbox").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {


        if (this.readyState == 4 && this.status == 200) {
            setTimeout((function() {
                document.getElementById("l1-968b").style.display = "none";
                document.getElementById("preloader").style = "display: none;";
            }), 1000);
            obj = JSON.parse(this.responseText);

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

//
//
//
// get messages function
//
//
//
//
//


function getmessages() {
    if (currentserver === null) {
        return;
    }

    var stuff =
        `https://${host}/api/api1.php?key=${api}&function=getmessages&token=` +
        localStorage.getItem("token") +
        "&serverid=" +
        currentserver;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var obj = null;
        if (this.readyState == 4 && this.status == 200) {
            try {
                obj = JSON.parse(this.responseText);
            } catch (e) {
                if (nomessages) return;
                document.getElementById(currentserver + "_container").innerHTML = "";
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
                    if (silent == 1) {} else {
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

            obj.forEach((function(data, index) {
                //if it has a file (image only currently)
                if (data.file !== null) {
                    if (data.sender == username) {
                        document.getElementById(currentserver + "_container").innerHTML +=
                            "<div class='msg sender'><p style='color: rgba(0,0,0,1); font-size: 12px;'>" +
                            data.sender + " | " + timeConverter(data.time) +
                            `</p><p><img onclick="document.getElementById('${data.file}').style.display = 'block';" src="https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}" width="30%"/>` +
                            `<div id="${data.file}" class="img-modal">
                  <span class="close" onclick="document.getElementById('${data.file}').style.display = 'none';">&times;</span>
                  <img class="img-modal-content" src="https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}" id="img01">
                  <div id="caption"><a onclick='shell.openExternal("https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}");' href="#">Open Original</a></div>
                </div>`
                        "</p></div>\n";
                        return;
                    } else {
                        document.getElementById(currentserver + "_container").innerHTML +=
                            "<div class='msg'><p style='color: rgba(0,0,0,1); font-size: 12px;'>" +
                            data.sender + " | " + timeConverter(data.time) +
                            `</p><p><img onclick="document.getElementById('${data.file}').style.display = 'block';" src="https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}" width="30%"/>` +
                            `<div id="${data.file}" class="img-modal">
                <span class="close" onclick="document.getElementById('${data.file}').style.display = 'none';">&times;</span>
                <img class="img-modal-content" src="https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}" id="img01">
                <div id="caption"><a onclick='shell.openExternal("https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}");' href="#">Open Original</a></div>
              </div>`
                        "</p></div>\n";
                    }
                    document.getElementById(
                        currentserver + "_container"
                    ).scrollTop = document.getElementById(
                        currentserver + "_container"
                    ).scrollHeight;
                    silent = 0;
                    return;
                }

                //normal text mode (CLASSIC ALPHA)

                if (data.sender == username) {
                    document.getElementById(currentserver + "_container").innerHTML +=
                        "<div class='msg sender'><p style='color: rgba(0,0,0,1); font-size: 12px;'>" +
                        data.sender + " | " + timeConverter(data.time) +
                        "</p><p>" +
                        linkify(data.message) +
                        "</p></div>\n";
                } else {
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

            }));
        } else {}
    };

    xhttp.open("GET", stuff, true);
    xhttp.send();
}

//
//
//
// get members
//
//

function getmembers() {
    if (currentserver === null) {
        return;
    }

    var stuff =
        `https://${host}/api/api1.php?key=${api}&function=getmembers&token=` +
        localStorage.getItem("token") +
        "&serverid=" +
        currentserver;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var obj = null;
        if (this.readyState == 4 && this.status == 200) {
            try {
                obj = JSON.parse(this.responseText);
            } catch (e) {

                document.getElementById(currentserver + "_members").innerHTML = "";
                nomessages = 1;
                return;
            }
            nomessages = 0;
            if (this.responseText == memberslist) {
                return;
            }
            if (memberslist == "") {
                return;
            }
            if (currentserver == obj[0].serverid) {
                if (
                    document.getElementById(currentserver + "_members").innerHTML != ""
                ) {}
            }
            //console.log(this.responseText);
            document.getElementById(currentserver + "_members").innerHTML = "";
            memberslist = this.responseText;

            obj.forEach((function(data, index) {

            }));
        } else {}
    };

    xhttp.open("GET", stuff, true);
    xhttp.send();
}


//
//
//
//leave server via the client
//
//
//


function leave(id) {
    var stuff =
        "https://csoftware.cf/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=leavegroup&token=" +
        localStorage.getItem("token") +
        "&serverid=" +
        id;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
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

//
// delete group via the ID
//
//
function deletegroup(id) {
    var stuff =
        `https://${host}/api/api1.php?key=${api}&function=deletegroup&token=` +
        localStorage.getItem("token") +
        "&serverid=" +
        id;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
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

//
//
// create server
//
//
//


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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
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


//initial innitilazation of the servers grouplist
listgroups();