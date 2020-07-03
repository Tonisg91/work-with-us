// Se define aqui los atributos para que sea mas dificl acceder a la API key
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyClx6Jd_0jVGXYLS-s7Ya4XiBrPVoLe7i0&callback=initMap';
script.defer = true;
script.async = true;

const mapDiv = document.getElementById('map');
//Toma las coordenadas de los dos <p> ocultos.
const coordinates = {
  lat: Number(document.getElementById('lat').innerHTML),
  lng: Number(document.getElementById('lng').innerHTML)
}
//Carga el mapa.
window.initMap = function () {
  const map = new google.maps.Map(mapDiv, {
    zoom: 13,
    center: coordinates,
    disableDefaultUI: true
  });

  const marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 100,
      fillColor: "lightblue",
      fillOpacity: 0.2,
      strokeWeight: 0.2
    },
  });
};


// Carga el script
document.head.appendChild(script);








// function initMap() {



// initMap();