var currentmessages = null;
var log = false;
var silent = 1;
var username;
var resstring = "";
var numberofmessages = 0;
//var call = null;
var nomessages = "";
//var shell = require('electron').shell;
var $ = require("jquery");
var memberslist = null;
const { shell, session } = require('electron');
var swal = require('sweetalert');
var os = require("os");
var obj;
var sevmax = 1000000000000000000; //well we say unlimited but here is the fucking maximum.
var email;
var username;
//const fs = require("fs");
var host;
var api;
var currentlycalling = false;
document.getElementById("currentcall_btn").style.display = "none";
if (localStorage.getItem("host")) {
    host = localStorage.getItem("host");
    api = localStorage.getItem("ak");
} else {
    host = "enclica.com";
    api = "NaN"; //can someone make this invalid, thanks.
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function getExtension(path) {
    var basename = path.split(/[\\/]/).pop(), // extract file name from full path ...
        // (supports `\\` and `/` separators)
        pos = basename.lastIndexOf("."); // get last position of `.`

    if (basename === "" || pos < 1) // if file name is empty or ...
        return ""; //  `.` not found (-1) or comes first (0)

    return basename.slice(pos + 1); // extract extension ignoring `.`
}


function clearcache() {
    session.defaultSession.clearStorageData(); //this code creates errors, WTF! ErRoR CrEaToR 7000
}


//version and version name.
var version = "3.0.0"; //this is used in about but not the splash screen??????
var versionname = "Newton"; //this is used in about also under changelog, why?