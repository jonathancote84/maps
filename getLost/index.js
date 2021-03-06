// IIFE (Imediately Invoked Function Expression)
(function () { 
// var position;
var map;   
var randomCoord;
var pos;
var directionsService; 
var directionsDisplay; 

function enterMap(){
    $('#yes-button').on('click', function(){
        $('.open-question').toggleClass("hidden");
        $('#map').toggleClass("hidden", false);
    })
    $('#no-button').on('click', function(){
        $('.open-question').toggleClass("hidden");
        $('.on-no-page').toggleClass("hidden", false);
    })
    $('#yes-button-two').on('click', function(){
        $('.on-no-page').toggleClass("hidden");
        $('#map').toggleClass("hidden", false);
    })
}
function initMap() {

    //direction services 
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    
    // set value a map variable to the map you want to render
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 180},
        //default zoom 
        zoom: 12,
        // mapTypeId 
        mapTypeId: 'terrain',
        //vintage map styling
        styles:[
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#165c64"
                    },
                    {
                        "saturation": 34
                    },
                    {
                        "lightness": -69
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#b7caaa"
                    },
                    {
                        "saturation": -14
                    },
                    {
                        "lightness": -18
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#cbdac1"
                    },
                    {
                        "saturation": -6
                    },
                    {
                        "lightness": -9
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#8d9b83"
                    },
                    {
                        "saturation": -89
                    },
                    {
                        "lightness": -12
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#d4dad0"
                    },
                    {
                        "saturation": -88
                    },
                    {
                        "lightness": 54
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#bdc5b6"
                    },
                    {
                        "saturation": -89
                    },
                    {
                        "lightness": -3
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#bdc5b6"
                    },
                    {
                        "saturation": -89
                    },
                    {
                        "lightness": -26
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#c17118"
                    },
                    {
                        "saturation": 61
                    },
                    {
                        "lightness": -45
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#8ba975"
                    },
                    {
                        "saturation": -46
                    },
                    {
                        "lightness": -28
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#a43218"
                    },
                    {
                        "saturation": 74
                    },
                    {
                        "lightness": -51
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#3a3935"
                    },
                    {
                        "saturation": 5
                    },
                    {
                        "lightness": -57
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#cba923"
                    },
                    {
                        "saturation": 50
                    },
                    {
                        "lightness": -46
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    });

    //define infoWindow to say current location at the current location 
    var infoWindow = new google.maps.InfoWindow;

    // try HTML5 geolocation
    if (navigator.geolocation) {
        // getCurrentPosition allows you to gather position information from the browser
        navigator.geolocation.getCurrentPosition(function(position){
            // makes an object to store current position latitude and longitude 
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //infowindow for geolocation center
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);

            //set center of map to current position
            map.setCenter(pos);

            //drawing manager function is called here
            drawingInterface();

        }, function(){
            //error handling for geolocation
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        //error handling for geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    };


}

// this will render the drawingManager UI 
function drawingInterface() {
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['rectangle']
        },

       // edit options and styling for rectangle here  
        rectangleOptions: {
            editable: true
        }

    });   

    //render drawing manager and drawings on map
    drawingManager.setMap(map);

    //render directions
    directionsDisplay.setMap(map);

    //render direction panel 
    directionsDisplay.setPanel(document.getElementById('right-panel'));

    //event listner for when a rectangle is drawn
    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {

        
        // rectangle.addListener('bounds_changed', showNewRect); 

        // this is just a check to see .getBounds() of that rectangle 
        var maxLat = rectangle.getBounds().getNorthEast().lat();
        var minLat = rectangle.getBounds().getSouthWest().lat();
        var minLng = rectangle.getBounds().getNorthEast().lng();
        var maxLng = rectangle.getBounds().getSouthWest().lng();
                 
       //toggle visibilty of the get-lost-button
        $('#get-lost-button').toggleClass("hidden", false);

        // get-lost button event listner
        $(".container").on("click", '#get-lost-button', function() {
            //lets you know it ran
            console.log(`getLostClick, ran`);
            //random number
            var randomNum = Math.random();
            console.log(randomNum);

            //get random latitude from the .getBounds()
            var randomLat = randomNum* (maxLat - minLat) + minLat;

            // get random longititude from the .getBounds()
            var randomLng = randomNum * (maxLng - minLng) + minLng;
            console.log(randomLat);
            console.log(randomLng);
            // combine those random coordinates into usable .LatLng()
            randomCoord = new google.maps.LatLng(randomLat, randomLng);
            
            //show the directions panel
            $('#right-panel').toggleClass("hidden", false);  
       
            //call route function 
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
    
    });
 
};

//uses googles direction services     
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: pos,
        destination: randomCoord,
        // direction mode needs to be selectable
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
           
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}   

$(enterMap())
// loads event listner for the page loading 
google.maps.event.addDomListener(window, 'load', initMap);
})();