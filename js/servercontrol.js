//
// join server function
//
//
//
//
var delbtn = "";
var currentmessages = [];

function joinserver() {



    if (document.getElementById("serverjoininputbox").value == "dogecoin") {


        return;
    }
    if (sevmax == 100) return;
    var server = currentserver;
    var stuff =
        `https://enclica.com/api/?key=${api}&function=joingroup&token=` +
        localStorage.getItem("token") +
        "&invite=" +
        document.getElementById("serverjoininputbox").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {


        if (this.readyState == 4 && this.status == 200) {
            obj = JSON.parse(this.responseText);
            if (typeof error == 'undefined') {
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You failed to join the server check to see if you typed it correctly or you might of been banned.',
                    footer: '<a href>Why do I have this issue?</a>'
                });
                return;
            }
            if (obj.code === 568999) {
                var errornoti = new Audio("../assets/sounds/mp3-converted/denied1.mp3");
                error.setAttribute("crossorigin", "anonymous");
                error.play();
                document.getElementById('jerror').style.display = 'block';

            } else {
                listgroups();
                var noti = new Audio("../assets/sounds/mp3-converted/noti3.mp3");
                noti.setAttribute("crossorigin", "anonymous");
                noti.play();
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

    //get messages from server and if its a image file display image and if its not an image then display the textarea using jquery $.get

    if (currentserver === null) {
        return;
    }
    var stuff =

        `https://enclica.com/api/?&function=getmessages&token=` +
        localStorage.getItem("token") +
        "&serverid=" +
        currentserver;

    $.get(stuff, function(data) {
        if (data.length == 0) {
            return;
        }
        if (currentmessages == Object.keys(data).length) {
            return;
        }
        $('#' + currentserver + '_container').html('');
        currentmessages = Object.keys(data).length;
        data.forEach(function(message) {
            //check if message contains a file and if it does then append with an image file and if not then append with a textarea
            if (message.file) {

                switch (getExtension(message.file)) {
                    case 'jpg' || 'jpeg' || 'png' || 'gif':
                        $('#' + currentserver + '_container').append(`
                        <div class="ccontainer darker">
                            <span class="sender">${message.sender}</span>
                            <img class="avi" src="https://enclica.com/api/?function=pfpget&username=${message.sender}" alt="Avatar" style="width:100%;">
                            <p>
                           
                            <img class="img" onclick="document.getElementById('${message.file}').style.display = 'block';" src="https://cdn.enclica.com/enc/data/${message.sender}/${message.file}" width="30%" />
                            ${message.file}<br/>
                            </p>
                            <span class="time-right">${timeConverter(message.time)}</span>
                            ${delbtn}
                            </div>
                            
                            <!-- modal for it -->
                            
                            <div id="${message.file}" class="img-modal">
                    <span class="close" onclick="document.getElementById('${message.file}').style.display = 'none';">&times;</span>
                    <img class="img-modal-content" src="https://cdn.enclica.com/enc/data/${message.sender}/${message.file}" id="img01">
                    <div id="caption"><a onclick='shell.openExternal("https://cdn.enclica.com/enc/data/${message.sender}/${message.file}");' href="#">Open Original</a></div>
                    </div>`);
                        break;

                        //audio file
                    case 'mp3' || 'wav' || 'ogg' || 'flac':
                        $('#' + currentserver + '_container').append(`<div class="ccontainer darker">
                        <span class="sender">${message.sender}</span>
                        <img class="avi" src="https://enclica.com/api/?function=pfpget&username=${message.sender}" alt="Avatar" style="width:100%;">
                        <p>
                        ${message.file}<br/>
                        <button class="btn btn-info" onclick="play('https://cdn.enclica.com/enc/data/${message.sender}/${message.file}', 'audio')">play audio</button>
                        </p>
                        <span class="time-right">${timeConverter(message.time)}</span>
                        ${delbtn}
                        </div>`);
                        break;
                        //video file
                    case 'mp4' || 'webm' || 'mkv' || 'avi' || 'mov':
                        $('#' + currentserver + '_container').append(`<div class="ccontainer darker">
                        <span class="sender">${message.sender}</span>
                        <img class="avi" src="https://enclica.com/api/?function=pfpget&username=${message.sender}" alt="Avatar" style="width:100%;">
                        <p>
                        ${message.file}<br/>
                        <button class="btn btn-info" onclick="play('https://cdn.enclica.com/enc/data/${message.sender}/${message.file}', 'video')">play video</button>
                        </p>
                        <span class="time-right">${timeConverter(message.time)}</span>
                        ${delbtn}
                        </div>`);

                    default:
                        $('#' + currentserver + '_container').append(`<div class="ccontainer darker">
                        <span class="sender">${message.sender}</span>
                        <img class="avi" src="https://enclica.com/api/?function=pfpget&username=${message.sender}" alt="Avatar" style="width:100%;">
                        <p>
                        <a onclick='shell.openExternal("https://cdn.enclica.com/enc/data/${message.sender}/${message.file}");' href="#">Open ${message.file} in browser </a><br/><span style="color:red">UNTRUSTED FILE THIS HASNT BEEN SCANNED FOR VIRUSES</span>
                        </p>
                        <span class="time-right">${timeConverter(message.time)}</span>
                        ${delbtn}
                        </div>`);
                        break;
                }
            } else {
                $('#' + currentserver + '_container').append(` <div class = "ccontainer">
                                            <span class = "sender" > ${message.sender} </span> <img class = "avi"
                                            src = "https://enclica.com/api/?function=pfpget&username=${message.sender}"
                                            alt = "Avatar"
                                            style = "width:100%;">
                                            <p class = "message"> ${message.message} </p> <span class = "time-right" > ${timeConverter(message.time)} </span> </div> `);
            }
        });


    })

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
        `https://enclica.com/api/?function=getmembers&token=` +
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
            var list = [""];
            obj.forEach((function(data, index) {
                $.ajaxSetup({ async: false });
                if (data == "") { return; }
                var status = 'away';
                $.get(`https://enclica.com/api/user/getstatus/?username=${data}`, function(udata) {
                    status = udata.status;

                });
                $('#' + currentserver + '_members').append(`<div class='icon-container' style="clear: left;">
                                                <img style="float: right;" class="iconimg" src="https://enclica.com/api/?function=pfpget&username=${data}" />
                                                <div class='statusmask'></div>
                                                <div class='status-circle ${status}'></div>
                                                <p class="membername">${data}</p>
                                            </div>`);
            }));
            $.ajaxSetup({ async: true });
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
        "https://enclica.com/api/?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=leavegroup&token=" +
        localStorage.getItem("token") +
        "&serverid=" +
        id;
    //console.warn(stuff);

    fetch(stuff)
        .then(function(data) {

            silent = 1;
            var leave = new Audio(
                "../assets/sounds/mp3-converted/noti7.mp3"
            );
            leave.play();
            listgroups();

        }).catch(function(data) {
            // console.log("FATAL ERROR");
        });

}

//
// delete group via the ID
//
//
function deletegroup(id) {

    swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this server!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                var stuff =
                    `https://enclica.com/api/?key=${api}&function=deletegroup&token=` + localStorage.getItem("token") + "&serverid=" + id;

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        silent = 1;
                        var leave = new Audio(
                            "../assets/sounds/mp3-converted/noti7.mp3"
                        );
                        leave.play();
                        listgroups();
                        swal("Deleted!", "Your server has been deleted.", "success");

                    } else {
                        swal("Deletion error.", "An error occured when trying to delete your server.", "warning");
                    }
                };

                xhttp.open("GET", stuff, true);
                xhttp.send();

                swal("Poof! Your server has been deleted!", {
                    icon: "success",
                });
                sectiondiv(event, 'chats', null, null)
            } else {
                swal("server deletion was cancelled!");
            }
        });

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
        `https://enclica.com/api/?key=${api}&function=creategroup&token=` +
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

function logout() {
    localStorage.removeItem("token");
    location.reload();
}




$('#preloader').hide();