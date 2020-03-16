function initialise() {
  initMap();
}

function initMap() {

  // Creates map in div and gives default center on Europe, removes default UI.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 50.8453493,
      lng: 14.9068077
    },
    zoom: 5,
    disableDefaultUI: true,
    // Sets map to night mode to suit style.
    styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#242f3e"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#746855"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#242f3e"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#d59563"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#d59563"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#263c3f"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#6b9a76"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#38414e"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#212a37"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9ca5b3"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#746855"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#1f2835"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#f3d19c"
        }]
      },
      {
        "featureType": "road.local",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#2f3948"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#d59563"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#17263c"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#515c6d"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#17263c"
        }]
      }
    ]
  });
  let autocomplete;
  let input = document.getElementById('autocomplete');
  let options = {
    types: ['(cities)']
  };
  autocomplete = new google.maps.places.Autocomplete(input, options);

}