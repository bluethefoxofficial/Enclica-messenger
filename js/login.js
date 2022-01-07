//var swal = require( 'sweetalert' );
console.log("LOGIN SCREEN LOGIN.JS ACTIVE");
var $ = require('jquery');
var swal = require('sweetalert');

function login(e) {
    var host;
    var api;
    if (localStorage.getItem("host")) {
        host = localStorage.getItem("host");
        api = localStorage.getItem("ak");
    } else {
        host = "enclica.com";

    }
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var stuff = `https://${host}/api/user/login/`;
    console.log(stuff);

    //jquery login request

    $.ajax({
        url: stuff,
        type: "POST",
        data: {
            username: username,
            password: password
        },
        success: function(data) {
            console.log(data);
            if (data.error == "") {
                localStorage.setItem("token", data.token);
                localStorage.setItem("host", host);
                localStorage.setItem("ak", api);
                window.location = "../windows/main.html";
            } else {
                swal("Error", "Invalid username or password", "error");
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
}



//jquery on submit login request

$("#login").on('submit', function(e) {
    e.preventDefault();
    login();
    return false;
});

//login button pressed

$("#login-btn").on('click', function(e) {
    e.preventDefault();
    login();
    return false;
});