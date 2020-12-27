//
// send message
//
//
//
function sendmessage(e, input) {


    var code = e.keyCode ? e.keyCode : e.which;

    if (code == 13) {
        e.preventDefault();
        //Enter keycode
        //insert csoftware send message code here.

        if (input.value.startsWith("/")) {
            console.log("CH");


            if(input.value.startsWith("/shrug")){
                input.value = `¯\\\_\(\ツ\)\_\/\¯`;
            }else if(input.value.startsWith("/logout")){
                logout();
            }else if(input.value.startsWith("/unloadcss")){
                unloadcss();
            }else if(input.value.startsWith("/reloadcss")){
                reloadcss();
            }else if(input.value.startsWith("/clearcache")){
                clearcache();
            }else if(input.value.startsWith("/playsound")){
                var str = input.value.split(" ");

                var aud = new Audio("../assets/sounds/mp3-converted/" + str[1]);
                aud.play();
                console.log("PLAYING TEST");
            }
            return commandhandler(input, "");
        }
        if (numberofmessages == 10) {
            document.querySelector("#spam").style.display = "block";
            return;
        }
        if (input.value == "") {


            return;


        }


        var stuff = `https://${host}/api/api1.php`;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                silent = 1;
                getmessages();
                document.querySelector("#" +
                    currentserver + "_container"
                ).scrollTop = document.querySelector("#" +
                    currentserver + "_container"
                ).scrollHeight;
                silent = 1;
            } else {}
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

//
//create links from url with linkify
//
//
//
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
        '<a href="mailto:$1" target="_blank">$1</a>'
    );

    return replacedText;
}
//
//
//command handler
//

function commandhandler(input, messagecontainer) {



    if (input == "/help") {
        alert("WIP");
    } else if (input == "/shrug") {
        input.value = `¯|_(ツ)_|¯`;
        console.log("shrug command");
    }
}

//
// spam prevention
//
//
//

function spamprevention() {
    if(log == true){
        console.warn("CONSOLE LOGGING IS ENABLED THIS WILL REVEAL DATA THAT SHOULDNT BE SHARED!");
        console.warn("spam timer cleared.");
    }
    numberofmessages = 0;

    
}
setInterval(spamprevention, 5000);
spamprevention();


function dismissspam() {
    document.querySelector("#spam").style.display = "none";
}
window.setInterval((function() {
    getmessages();
}), 1000);
window.setInterval((function() {
    getmembers();
    
}), 8000);



//
//
//delete your message
//
//



function deletemessage(messageid,file){
    var stuff =
    `https://${host}/api/api1.php?key=${api}&function=deletemessage&token=` +
    localStorage.getItem("token") +
    "&messageid=" +
    messageid + "&file=" + file;
fetch(stuff).then(function(){
    silent = 1;
    getmessages();
});
}