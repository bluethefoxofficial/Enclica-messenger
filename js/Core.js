// Get the modal

var modal = document.getElementById("create");

// Get the button that opens the modal
var modalbtn = document.getElementById("create_btn");

// Get the <span> element that closes the modal
var modalspan = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
modalbtn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
modalspan.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
