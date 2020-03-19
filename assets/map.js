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
      <div class='close-container'><button class='close button' value='close'>close</button></div>`
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

  // Init filter

  $(".filter-buttons").click(function() {
    console.log("chosen");
    filterChoice = $(this).val();
    if (filterChoice == "all") {
      filterMarkers(markers);
    } else {
      filterMarkers(filterChoice);
      console.log(filterChoice);
    }
  });

  // Creates map in div and gives default center on Europe, removes default UI.
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 50.8453493,
      lng: 14.9068077
    },
    zoom: 5,
    disableDefaultUI: true,

    // Sets map to night mode to suit style.
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#242f3e"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#242f3e"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#263c3f"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6b9a76"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#38414e"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#212a37"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9ca5b3"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#1f2835"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#f3d19c"
          }
        ]
      },
      {
        featureType: "road.local",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#2f3948"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#17263c"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#515c6d"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#17263c"
          }
        ]
      }
    ]
  });
  var filterChoice;
  var markers = [];
  var fLow = [];
  var fMed = [];
  var fHigh = [];
  var location;
  var filterVal;
  var priority;
  var marker;
  // Filter functionality

  function filterMarkers(fMarker) {
    console.log(fMarker);
    for (var i = 0; i < markers.length; i++) {
      markers[i].setVisible(false);
    }
    if (fMarker == "fHigh") {
      for (var i = 0; i < fHigh.length; i++) {
        fHigh[i].setVisible(true);
      }
    } else if (fMarker == "fMed") {
      for (var i = 0; i < fMed.length; i++) {
        fMed[i].setVisible(true);
      }
    } else if (fMarker == "fLow") {
      for (var i = 0; i < fLow.length; i++) {
        fLow[i].setVisible(true);
      }
    } else {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setVisible(true);
      }
    }
  }

  function resetMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
    fLow = [];
    fMed = [];
    fHigh = [];
  }
  // Add click functionality to reset button. Resets all markers.
  document
    .getElementById("reset-markers")
    .addEventListener("click", function() {
      resetMarkers();
    });
  // Add click functionality to zoom out button. Zooms map out.
  document
    .getElementById("button-zoom-out")
    .addEventListener("click", function() {
      map.setZoom(3);
      map.setCenter({
        lat: 39.788275,
        lng: -0.935501
      });
    });

  // -------------------------------------------------------------------

  // Add right-click to place marker functionality.
  map.addListener("rightclick", function(event) {
    map.panTo(event.latLng, map);
    map.setZoom(10);

    // Open priority selection
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
    location = event.latLng;

    // listens for priority choice
    $(".button").unbind("click");
    $(".button").click(function() {
      priority = $(this).val();
      setPriority(location, priority);
      infoWindow.close(map);
    });
  });

  function setPriority(event, priority) {
    console.log(priority);
    if (priority == "high") {
      setMarkerCurrent(event, priority, "high");
    } else if (priority == "med") {
      setMarkerCurrent(event, priority, "med");
    } else if (priority == "low") {
      setMarkerCurrent(event, priority, "low");
    } else {
      infoWindow.close(map);
      console.log("closed");
    }
  }

  function setMarkerCurrent(location, priority, fVal) {
    console.log(priority);
    // filterVal = fVal;
    // console.log(fVal);
    // console.log(location);
    marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: `/assets/images/${priority}.png`
    });

    if (fVal == "high") {
      fHigh.push(marker);
      markers.push(marker);
    } else if (fVal == "med") {
      fMed.push(marker);
      markers.push(marker);
    } else if (fVal == "low") {
      fLow.push(marker);
      markers.push(marker);
    }
    console.log(markers);
    console.log(`low: ${fLow}`);
    console.log(`med: ${fMed}`);
    console.log(`high: ${fHigh}`);
    google.maps.event.addListener(marker, "click", function() {
      map.panTo(this.getPosition());
      map.setZoom(10);
    });
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
      location = place.geometry.location;
      $("button").click(function() {
        var priority = $(this).val();

        setPriority(location, priority);
        infoWindow.close(map);
      });
      setMarkerCurrent(location);
      document.getElementById("autocomplete").value = "";
    } else {
      document.getElementById("autocomplete").placeholder =
        "search for destination...";
    }
  }
}
