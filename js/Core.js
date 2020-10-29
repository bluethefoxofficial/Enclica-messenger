var currentmessages = null;
var silent = 1;
var username;
var numberofmessages = 0;
var call = null;
var nomessages = "";
var shell = require('electron').shell;
var $ = require("jquery");
var memberslist = null;
var swal = require( 'sweetalert' );
var md5 = require("md5");
var os = require("os");
var obj;
var email;
var username;
const fs = require("fs");
var host;
var api;

if (localStorage.getItem("host")) {
    host = localStorage.getItem("host");
    api = localStorage.getItem("ak");
} else {
    host = "csoftware.cf";
    api = "grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL";
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