const modal = document.getElementById("myModal");
const btn = document.getElementById("delete-button");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

// Cuando el user hace click en span (x), cierra el modal
span.onclick = function () {
  modal.style.display = "none";
}

// Si el user hace click fuera del modal, se cierra
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}