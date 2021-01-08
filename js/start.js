
document.getElementById("host").innerHTML = host;

document.getElementById("chatoblock").click();



function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

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
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("preloader").style = "display: none;";
        obj = JSON.parse(this.responseText);

        window.title = "Welcome to Encilica " + obj.username;
        username = obj.username;
        document.getElementById("usernametext").innerHTML = obj.username;
        document.getElementById("pfp").src =
            "https://www.gravatar.com/avatar/" + md5(obj.email) + "?s=32";
        document.getElementById("name").innerHTML = username;
        document.getElementById("bio").innerHTML = obj.bio;
        document.getElementById("l1-968b").style = "display: none;";
    }


   /* function readFile(filepath) {
        fs.readFile(filepath, "utf-8", (function(err, data) {
            if (err) {
                alert("An error ocurred reading the file :" + err.message);
                return;
            }
            document.getElementById("customcss").innerHTML = data;
        }));
    }
    readFile(__dirname + "/../assets/configurable/custom.css"); */
};
xhttp.open("GET", stuff, true);
xhttp.send();

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
var md5 = require("md5");
const {
    getServers
} = require("dns");
var obj;
var email;
var username;
if (!localStorage.getItem("token")) {
    window.location = "../windows/login.html";
}


