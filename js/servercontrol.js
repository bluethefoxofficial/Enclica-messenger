//
// join server function
//
//
//
//
var delbtn = "";
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
            obj = JSON.parse(this.responseText);
            if(typeof error == 'undefined'){
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
    document.getElementById('jerror').style.display = 'none';
    if (currentserver === null) {
        return;
    }

    var stuff =
        `https://${host}/api/api1.php?key=${api}&function=getmessages&token=` +
        localStorage.getItem("token") +
        "&serverid=" +
        currentserver;
    //console.log(stuff);
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
                        
                        silent = 0;
                    }
                }
            }
           // console.log(this.responseText);
            document.getElementById(currentserver + "_container").innerHTML = "";
            document.getElementById(currentserver + "_container").innerHTML = "";
            currentmessages = this.responseText;

            obj.forEach((function(data, index) {
                if(data.sender == username){
                   delbtn = `<button class="btn btn-danger" style="width: 50px; height: 18px; padding:0px 0px;"onclick='deletemessage(${data.ID},"${data.file}");'><svg id="i-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
                        </svg></button>`;
                }
                if (data.file !== null) {
                    console.log(`${data.file} FILE EXTENTION FOR ` + getExtension(data.file));
                    if(getExtension(data.file) === "png" || getExtension(data.file) === "jpg" || getExtension(data.file) === "gif" || getExtension(data.file) == "tiff" ){
                    document.getElementById(currentserver + "_container").innerHTML += `<div id="${data.file}" class="img-modal">
                    <span class="close" onclick="document.getElementById('${data.file}').style.display = 'none';">&times;</span>
                    <img class="img-modal-content" src="https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}" id="img01">
                    <div id="caption"><a onclick='shell.openExternal("https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}");' href="#">Open Original</a></div>
                    </div>`;
                    }

                       
                        //
                        //message based off file type
                        //
              /* IMAGES  */     if(getExtension(data.file) === "png" || getExtension(data.file) === "jpg" || getExtension(data.file) === "gif" || getExtension(data.file) == "tiff" ){
                            document.getElementById(currentserver + "_container").innerHTML += 
                            `<div class="ccontainer darker">
                            <span class="sender">${data.sender}</span>
                            <img class="avi" src="https://csoftware.cf/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=pfpget&username=${data.sender}" alt="Avatar" style="width:100%;">
                            <p>
                           
                            <img class="img" onclick="document.getElementById('${data.file}').style.display = 'block';" src="https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}" width="30%" />
                            ${data.file}<br/>
                            </p>
                            <span class="time-right">${timeConverter(data.time)}</span>
                            ${delbtn}
                            </div>`;
             /* AUDIO  */       }else if(getExtension(data.file) === "mp3" || getExtension(data.file) === "wav"){
                            document.getElementById(currentserver + "_container").innerHTML += 
                            `<div class="ccontainer darker">
                            <span class="sender">${data.sender}</span>
                            <img class="avi" src="https://csoftware.cf/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=pfpget&username=${data.sender}" alt="Avatar" style="width:100%;">
                            <p>
                            ${data.file}<br/>
                            <button class="btn btn-info" onclick="play('https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}')">play audio</button>
                            </p>
                            <span class="time-right">${timeConverter(data.time)}</span>
                            ${delbtn}
                            </div>`;
             /* VIDEO  */      }else if(getExtension(data.file) === "avi" || getExtension(data.file) === "mp4"){
                            document.getElementById(currentserver + "_container").innerHTML += 
                            `<div class="ccontainer darker">
                            <span class="sender">${data.sender}</span>
                            <img class="avi" src="https://csoftware.cf/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=pfpget&username=${data.sender}" alt="Avatar" style="width:100%;">
                            <p>
                            ${data.file}<br/>
                            <button class="btn btn-info" onclick="play('https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}', 'video')">play video</button>
                            </p>
                            <span class="time-right">${timeConverter(data.time)}</span>
                            ${delbtn}
                            </div>`;
             /* OTHERS */      }else{
                document.getElementById(currentserver + "_container").innerHTML += 
                `<div class="ccontainer darker">
                <span class="sender">${data.sender}</span>
                <img class="avi" src="https://csoftware.cf/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=pfpget&username=${data.sender}" alt="Avatar" style="width:100%;">
                <p>
                <a onclick='shell.openExternal("https://cdn.csoftware.cf/enc/data/${data.sender}/${data.file}");' href="#">Open ${data.file} in browser </a><br/><span style="color:red">UNTRUSTED FILE THIS HASNT BEEN SCANNED FOR VIRUSES</span>
                </p>
                <span class="time-right">${timeConverter(data.time)}</span>
                ${delbtn}
                </div>`;
                               }
                        return;
                    scrollToBottom(document.getElementById(currentserver + "_container"));
                    silent = 0;
                    return;
                }

                //normal text
                        document.getElementById(currentserver + "_container").innerHTML += 
                            `<div class="ccontainer darker">
                            <span class="sender">${data.sender}</span>
                            <img  class="avi" src="https://csoftware.cf/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=pfpget&username=${data.sender}" alt="Avatar" style="width:100%;">
                            <p>${linkify(data.message)}</p>
                            <span class="time-right">${timeConverter(data.time)}</span>
                            ${delbtn}
                            </div>`;
                
               // scrollToBottom(document.getElementById(currentserver + "_container"));
                
                scrollToBottom(currentserver + "_scroll");
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
            var list = [""];
             obj.forEach((function(data, index) {
                 if(data == ""){return; }
                list += `<div class='icon-container' style="clear: left;">
                <img style="float: right;"class="iconimg" src="https://csoftware.cf/api/api1.php?key=grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL&function=pfpget&username=${data}" />
                <div class='statusmask'></div>
                <div class='status-circle'></div>
                <p class="membername">${data}</p>
                </div>`
            }));
            document.getElementById(currentserver + "_members").innerHTML = list;
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
    //console.warn(stuff);

fetch(stuff)
  .then(function (data){

    silent = 1;
    var leave = new Audio(
        "../assets/sounds/mp3-converted/noti7.mp3"
    );
    leave.play();
    listgroups();

  }).catch(function(data){
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
            `https://${host}/api/api1.php?key=${api}&function=deletegroup&token=` +localStorage.getItem("token") + "&serverid=" +id;
    
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
          sectiondiv(event, 'chats',null,null)
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