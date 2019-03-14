// this will take the geolaction derived point and the randomly created point that was within the polygon the user draws

// then sends those to points to the directions services API to 

// to do this within the javascript API the 

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      // this will obviously change to your current position dirived via geolocation 
      center: {lat: -24.345, lng: 134.46}  // Australia.
    });
  
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: map,
      // this is the directions panel 
      panel: document.getElementById('right-panel')
    });
  // this allows for the directions to be updated 
    directionsDisplay.addListener('directions_changed', function() {
      computeTotalDistance(directionsDisplay.getDirections());
    });
  // route in this case will be your geolocation derived start point and your randomly derived end point
    displayRoute('Perth, WA', 'Sydney, NSW', directionsService,
        directionsDisplay);
  }
  
  function displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      //waypoints are obviously different
      waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
      //travel mode will be user selectable 
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }
  // the math here is for computing total distance in km this needs to be changed to milage

  function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }
// different example that takes an direction type input

  function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      // this one is set to golden gate park
      center: {lat: 37.77, lng: -122.447}
    });
    // this is going to be where you start rendering directions 
    directionsDisplay.setMap(map);

    //allows you to add a bicycle routes layer 
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay);
    document.getElementById('mode').addEventListener('change', function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
  }
  
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = document.getElementById('mode').value;
    directionsService.route({
      origin: {lat: 37.77, lng: -122.447},  // Haight.
      destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }