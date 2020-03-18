function initialise() {
  initMap();
}

// Init the map(contains base functionality when opening webpage)
function initMap() {
  let autocomplete;
  var infoWindow = new google.maps.InfoWindow({
    content: `
      <button class='priorityLow button' value='low'>low</button>
      <button class='priorityMed button' value='med'>med</button>
      <button class='priorityHigh button' value='high'>high</button>
      <button value='high'>hi</button>`
  });
  let options = {
    types: ["(cities)"]
  };
  // Loading infowindow into dom to select later
  infoWindow.open(map);
  infoWindow.close(map);

  // Init autocomplete for searchbar
  let input = document.getElementById("autocomplete");
  autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener("place_changed", onPlaceChanged);

  // Creates map in div and gives default center on Europe, removes default UI.
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 50.8453493,
      lng: 14.9068077
    },
    zoom: 5,
    disableDefaultUI: true,

    // Sets map to night mode to suit style.
    styles: [{
        elementType: "geometry",
        stylers: [{
          color: "#242f3e"
        }]
      },
      {
        elementType: "labels.text.fill",
        stylers: [{
          color: "#746855"
        }]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{
          color: "#242f3e"
        }]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#d59563"
        }]
      },
      {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#d59563"
        }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{
          color: "#263c3f"
        }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#6b9a76"
        }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
          color: "#38414e"
        }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#212a37"
        }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#9ca5b3"
        }]
      },
      {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{
          color: "#746855"
        }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#1f2835"
        }]
      },
      {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#f3d19c"
        }]
      },
      {
        featureType: "road.local",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "road.local",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
          color: "#2f3948"
        }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#d59563"
        }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
          color: "#17263c"
        }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#515c6d"
        }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{
          color: "#17263c"
        }]
      }
    ]
  });



  function resetMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];

  }
  // Add click functionality to reset button. Resets all markers.
  document
    .getElementById("reset-markers")
    .addEventListener("click", function () {
      resetMarkers();
    });
  // Add click functionality to zoom out button. Zooms map out.
  document
    .getElementById("button-zoom-out")
    .addEventListener("click", function () {
      map.setZoom(5);
      map.setCenter({
        lat: 50.8453493,
        lng: 14.9068077
      });
    });





  // -------------------------------------------------------------------
  var markers = [];
  // Add right-click to place marker functionality.
  map.addListener("rightclick", function (event) {
    map.panTo(event.latLng, map);
    map.setZoom(10);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);

    $("button").click(function () {
      var priority = $(this).val();
      setPriority(event.latLng, priority);
      infoWindow.close(map);
    });
  });

  function setPriority(event, priority) {
    if (priority == 'high') {
      setMarkerCurrent(event, priority);
      console.log('sent high')
    } else if (priority == 'med') {
      setMarkerCurrent(event, priority);
      console.log('sent med')
    } else if (priority = 'low') {
      setMarkerCurrent(event, priority);
      console.log('sent low')
    }
  }

  function setMarkerCurrent(location, priority) {
    console.log(priority)

    console.log(location)
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: `/assets/images/${priority}.png`
    });
    markers.push(marker);
    console.log(markers);
  }
  // -------------------------------------------------------------------
  // setMarkerCurrent(event.latLng);


  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(10);
      infoWindow.setPosition(place.geometry.location);
      infoWindow.open(map);

      $("button").click(function () {
        var priority = $(this).val();
        setPriority(place.geometry.location, priority);
        infoWindow.close(map);
      });
      setMarkerCurrent(place.geometry.location);
      document.getElementById("autocomplete").value = "";
    } else {
      document.getElementById("autocomplete").placeholder =
        "search for destination...";
    }
  }
}