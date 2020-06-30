//GET POSITION AND SAVE ON USER DATA
const locBtn = document.getElementById('location-btn');
locBtn.addEventListener('click', (event) => {
  event.preventDefault();
  getCoords();
})

function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updateLocationFields);
    locBtn.classList.remove('blue-btn')
    locBtn.classList.add('green-btn')
    locBtn.innerHTML = 'Ubicacion obtenida'
  } else {
    alert('Este navegador no soporta Geolocation');
  }
}


function updateLocationFields(location) {
  const { latitude, longitude } = location.coords;
  document.getElementById('lat-input').value = latitude;
  document.getElementById('lng-input').value = longitude;
}