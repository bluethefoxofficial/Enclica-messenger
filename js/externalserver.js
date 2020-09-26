document.getElementById('msg').src='../assets/images/sysload.gif';
document.getElementById("txt").innerHTML = "Awaiting input.";
function setup(){
    document.getElementById('msg').src='../assets/images/sysload.gif';
    document.getElementById("txt").innerHTML = "connecting...";


    var host = document.getElementById("sh").value;
    var ak = document.getElementById("ak").value
    var stuff =
    `https://${host}/api/api1.php?key=${ak}&function=test`;
  console.log(stuff);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    
    if (this.status == 404) {

        document.getElementById('msg').src='../assets/images/icons/error.png';
        document.getElementById("txt").innerHTML = "Cant connect to host due to the api not being found therefor it responded with a 404 error check the api server to see if the file has been removed and try to recover refer to recover.txt in the server files. or goto https://csoftware.cf/encilica/recover.php for more details.\n00x0F";
        return;
    }
    try{
    obj = JSON.parse(this.responseText);
    }catch{

    }
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('msg').src='../assets/images/icons/info.png';
       if(obj.code == 200){
        document.getElementById("txt").innerHTML = obj.message;
        document.getElementById('msg').src='../assets/images/icons/success.png';
        localStorage.setItem("host", document.getElementById("sh").value);
        localStorage.setItem("ak", document.getElementById("ak").value);
       }else{
        document.getElementById("txt").innerHTML = obj.error;
       }
    } else {
        document.getElementById('msg').src='../assets/images/icons/error.png';
        document.getElementById("txt").innerHTML = "Cant connect to host. \n00x00";
    }
    
  };
  
  xhttp.open("GET", stuff, true);
  xhttp.send(); 
    
}