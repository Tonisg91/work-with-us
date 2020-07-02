//PUT POSITION AT ADDANNOUNCEMENT FORM
const checkLoc = document.getElementById('useLocation');

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