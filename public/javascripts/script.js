//Funcionalidad sidenav
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