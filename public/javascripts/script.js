//SIDENAV
function openNav() {
  const sidenav = document.getElementById("sidenav");
  if (screen.width >= 768 && screen.width < 900) {
    sidenav.style.width = "30%";
  } else if (screen.width >= 900) {
    sidenav.style.width = "20%";
  } else {
    sidenav.style.width = "50%";
  }
}
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}


const modal = document.getElementById("myModal");
const btn = document.getElementById("delete-button");
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}