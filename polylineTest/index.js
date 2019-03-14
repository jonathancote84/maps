//call global variables ( not 100% why)

var map;
var infoWindow;
var position;

function initMap() {
    //direction services 
    // var directionDisplay = new google.maps.DirectionRenderer;
    // var directionService = new google.maps.directionService;
    // set value a map variable to the map you want to render
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 180},
        //default zoom 
        zoom: 16,
        // mapTypeId 
        mapTypeId: 'terrain'
    });
    //define infoWindow to say current location at the current location 
    infoWindow = new google.maps.InfoWindow;

    // try HTML5 geolocation
    if (navigator.geolocation) {
        // getCurrentPosition allows you to gather position information from the browser
        navigator.geolocation.getCurrentPosition(function(position){
            // makes an object to store current position latitude and longitude 
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
           
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
          drawingModes: ['polygon']
        },
        //this allows for the user to edit the polygon after it is drawn
        //this is also a place where you can adjust color, fill and line weight of the polygon
       
        polygonOptions: {
            clickable: false,
            editable: true,
            zIndex: 1
        },
  
        
    });   

    //render drawing manager and drawings on map
    drawingManager.setMap(map);
    //add event listner for when the polgon is complete 
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
        var coordinates = (polygon.getPath().getArray()); 
        ///var scopes1 = coordinates[][[Scopes]]:
        //example of how to use the data, lat and lng are functions 
        var newLat = coordinates[0].lat();
        var newLng = coordinates[0].lng();
        console.log(newLat, newLng);    



    });

     

};   











//the drawing needs a way to delete vertexes

// var deleteMenu = new deleteMenu();







// there should be an array to store the coordinates of the polygon being drawn
// I need to figure out how to use multiple libraries










 



