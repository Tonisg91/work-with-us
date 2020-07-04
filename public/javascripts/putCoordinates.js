const checkLoc = document.getElementById('useLocation');
// Los datos de localizacion estan cargados automaticamente en la view.
// Si se desactiva el checked, borra los datos.
const [cityInp, stateInp, latInp, lngInp] = document.querySelectorAll('.loc-field')
checkLoc.addEventListener('click', (event) => {
  if (checkLoc.checked) {
    location.reload();
  } else {
    cityInp.value = ''
    stateInp.value = ''
    latInp.value = ''
    lngInp.value = ''
  }
})