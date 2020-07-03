//Funcionamiento general: Toma posicion y lo introduce en dos <p> ocultos
//Luego el server toma los datos de esos campos
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