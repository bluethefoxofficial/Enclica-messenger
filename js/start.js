var md5 = require("md5");

var $ = require("jquery");


//user info username request async function for ajax request
function userInfo(token) {
    $.ajax({
        async: false,
        url: "https://enclica.com/api/user/info/",
        type: "GET",
        data: {
            token: token
        },
        success: function(da) {
            console.log("PASSED" + da.data.username);
            return da.data.username;
        }
    });
}




function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

if (!localStorage.getItem("token")) {
    window.location = "../windows/login.html";

}
//console.clear();
//jqeury add settings.html to id Settings onload

$.get('../windows/settings.html').done(function(data) {
    $('#settings').html(data);
    document.getElementById("host").innerHTML = host;
    document.getElementById("chatoblock").click();






    var obj;
    var stuff =
        `https://new.enclica.com/api/user/info/?token=` +
        localStorage.getItem("token");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("preloader").style = "display: none;";
            objpre = JSON.parse(this.responseText);

            obj = objpre.data;


            username = obj.username;
            document.getElementById("usernametext").innerHTML = obj.username;
            document.getElementById("pfp").src =
                "https://www.gravatar.com/avatar/" + md5(obj.email) + "?s=32"; //this is bad
            document.getElementById("name").innerHTML = username;
            document.getElementById("bio").innerHTML = obj.bio;
            document.getElementById("l1-968b").style = "display: none;";
        }
    };
    xhttp.open("GET", stuff, true);
    xhttp.send();

    function removeElement(elementId) {
        // Removes an element from the document
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }

    const {
        getServers
    } = require("dns");
    var obj;
    var email;
    var username;
    if (!localStorage.getItem("token")) {
        window.location = "../windows/login.html";
    }


});
//list community servers via jquery but first set community servers to ''
var communityservers = '';

$('#com').html('<img src="../assets/images/icons/info.png" width="30px"><h4>Currently no community servers are listed on the enclica network.</h3>');