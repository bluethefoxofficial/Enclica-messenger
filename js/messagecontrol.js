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
            commandhandler(input, "");
            return;
        }
        if (numberofmessages == 10) {
            document.getElementById("spam").style.display = "block";
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
        '<a href="mailto:$1">$1</a>'
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
        input = "¯\\_(ツ)_/¯";
        console.log("shrug command");
    }
}

//
// spam prevention
//
//
//

function spamprevention() {

    numberofmessages = 0;

    
}
setTimeout(spamprevention, 5000);
spamprevention();

function dismissspam() {
    document.getElementById("spam").style.display = "none";
}
window.setInterval((function() {
    getmessages();
}), 1000);
window.setInterval((function() {
    getmembers();
}), 1000);