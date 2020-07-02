// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyClx6Jd_0jVGXYLS-s7Ya4XiBrPVoLe7i0&callback=initMap';
script.defer = true;
script.async = true;

// Attach your callback function to the `window` object


const mapDiv = document.getElementById('map');
const coordinates = {
  lat: Number(document.getElementById('lat').innerHTML),
  lng: Number(document.getElementById('lng').innerHTML)
}

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


// Append the 'script' element to 'head'
document.head.appendChild(script);








// function initMap() {



// initMap();