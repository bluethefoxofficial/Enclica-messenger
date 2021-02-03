//var swal = require( 'sweetalert' );
console.log("LOGIN SCREEN LOGIN.JS ACTIVE");
function login(e) {
  e.preventDefault();
var host;
var api;
if(localStorage.getItem("host")){
host =  localStorage.getItem("host");
api =  localStorage.getItem("ak");
}else{
  host = "csoftware.cf";
  api = "grUs07Md3s4o9WIb7fi3vu0AGdjinGP8BvFFSvcNI6viEkXFhNY9ZODlNnNWMXfaapeb20NbVBadZtwH9kFUnOgPXn8oWuPPnqJL";
}
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var stuff = `https://${host}/api/api1.php?key=${api}&function=login&username=${username}&password=${password}`;
  console.log(stuff);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      console.log(obj);
      if (obj.error) {
        var error = new Audio("../assets/sounds/mp3-converted/noti7.mp3");
        error.setAttribute("crossorigin", "anonymous");
        error.play();
        document.getElementById("errortext").innerHTML = obj.error;
        swal({
          title: "Login error",
          text: obj.error,
          icon: "error",
        });
      }
      if (obj.login_token) {
        localStorage.setItem("token", obj.login_token);

        var success = new Audio("../assets/sounds/mp3-converted/welcome.mp3");
        document.getElementById("preloader").style.display = "inline";
        success.setAttribute("crossorigin", "anonymous");
        success.play();
        success.addEventListener("ended", function () {
          window.location = "../windows/main.html";
        });
      }
    }
  };
  xhttp.open("GET", stuff, true);
  xhttp.send();
}

document.getElementById("error").style.display = "none";
document.getElementById("login").addEventListener("submit", function (e) {
  login(e);
});
