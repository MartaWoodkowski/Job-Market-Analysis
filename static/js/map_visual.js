
// Get the data with d3.
d3.json('./static/data/gov_jobs.json').then(function(response) {

  var markers = L.markerClusterGroup();

  var keys = Object.keys(response);

  for(var i = 0; i < keys.length; i++){
    if (response[keys[i]].LocationLatitude){
      markers.addLayer(L.marker([response[keys[i]].LocationLatitude, response[keys[i]].LocationLongitude]).bindPopup(`<h3>${response[keys[i]].Title}</h3><hr>${response[keys[i]].Agency}<br>(${response[keys[i]].Department})`));
    };
  };


  // Adding the tile layer
  myTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var baseMaps = {
    "Map": myTileLayer
    };
  
  // Create an overlay object.
  var overlayMaps = {
    "Gov jobs": markers
  };

  // Define a map object.
  var myMap = L.map("map", {
    center: [38.41793880672843, -96.9990462392838],
    zoom: 5,
    layers: [myTileLayer, markers]
    });

  // Pass our map layers to our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

});
