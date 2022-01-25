var currentmessages = null;
var log = false;
var silent = 1;
var username;
var resstring = "";
var numberofmessages = 0;

var $ = require("jquery");

require('../../renderer.js');
var memberslist = null;
const { shell, session } = require('electron');
require("sweetalert");
var swal = require('sweetalert');
var os = require("os");

var username;

var host;
var api;
var currentlycalling = false;
document.getElementById("currentcall_btn").style.display = "none";
if (localStorage.getItem("host")) {
    host = localStorage.getItem("host");
    api = localStorage.getItem("ak");
} else {
    host = "enclica.com";
    api = ""; //can someone make this invalid, thanks.
}
var stuff = "https://enclica.com/api/user/info/singular/";
//use json and var stuff to get username

function userinformation() {
    $.get("https://enclica.com/api/user/info/singular/", { token: localStorage.getItem("token") }, function(d) {
        console.log(d);
        username = d.username;

    });
}

userinformation();

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
    //clear nodejs cache for electron
    session.defaultSession.clearCache(function() {
        console.log("cache cleared");
    });
}