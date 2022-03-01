// Get the modal
var modal = document.getElementById("modalBox");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/*
 * title is a string
 * content is an element
 */
function makeModal(title, ...content) {
  while (document.getElementById("modal").firstChild) {
    document.getElementById("modal").removeChild(document.getElementById("modal").firstChild);
  }
  document.getElementById("modalTitle").innerHTML = title;
  var a = 0;
  while (a < content.length) {
    document.getElementById("modal").appendChild(content[a]);
    a = a + 1;
  }
}

var demo = document.createElement("p");
demo.innerHTML = "This is stuff.";
var con = document.createElement("p");
con.innerHTML = "This is more stuff.";
makeModal("Information", demo, con);