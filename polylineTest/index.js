

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
          drawingModes: ['polygon', 'rectangle']
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
    //add event listner for when the polgon is complete VOID
    //this event listner is where the cordinates of your polygon are accessable, it doesn't yet have traking for the coordinates changing position VOID
    
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
        var coordinates = (polygon.getPath().getArray()); 
        // toggleButton();
        ///var scopes1 = coordinates[][[Scopes]]:
        //example of how to use the data, lat and lng are functions 
        for (let i =0; i < coordinates.length; i++) {
            var newLat = coordinates[i].lat();
            var newLng = coordinates[i].lng();
            var polyV = {lat: newLat, lng: newLng}
            //this is going to output an object for each vertex coord
            // console.log (polyV);
            doStuffWithLatLOng(coordinates[i]); 
    
        };
                 

       //toggle visibilty of the get-lost-button
        $('#get-lost-button').toggleClass("hidden");

        // get-lost button 
        $(".container").on("click", '#get-lost-button', function() {
                        var center = map.getCenter();

            console.log("center "+ map.getCenter().lat(),center.lng());
            console.log(`getLostClick, ran`);
                //get random latitude from the .getBounds()
            var randomLat=  (Math.random() * (map.getBounds().getSouthWest().lat() -        map.getBounds().getNorthEast().lat()) +                                     map.getBounds().getSouthWest().lat());
                // get random longititude from the .getBounds()
            var randomLng=    (Math.random() * ( map.getBounds().getSouthWest().lng() -     map.getBounds().getNorthEast().lng())+                                      map.getBounds().getNorthEast().lng());
            // combine those random coordinates into usable .LatLng()
            var randomCoord = new google.maps.LatLng(randomLat, randomLng);
          
                // condition to test geometry library .containsLocation( latlng,polygon)
           if (google.maps.geometry.poly.containsLocation(randomCoord, polygon) === true){ console.log("random in polygon ",+ randomCoord.lat(), randomCoord.lat());
               
            } else {
                console.log("coordinate not in polygon");
           }
                
           

            

            
            // on click should
            //find a random point within map.getBounds()
            //next I would need to check if that random point is within the vertexCoords
            // polygonInfo();  
        });
        
 



        var deleteMenu = new DeleteMenu();
        //event listener for the delete menu uses polygon 
        google.maps.event.addListener(polygon, 'rightclick', function(e) {
            // Check if click was on a vertex control point
            if (e.vertex == undefined) {
                return;
            }
            deleteMenu.open(map, polygon.getPath(), e.vertex);
        });

    });

};




    // BEGINS UI CODE FOR THE POPUP DELETE MENU 
    // A menu that lets a user delete a selected vertex of a path.
     // @constructor
     
function DeleteMenu() {
    this.div_ = document.createElement('div');
    this.div_.className = 'delete-menu';
    this.div_.innerHTML = 'Delete';

    var menu = this;
    google.maps.event.addDomListener(this.div_, 'click', function() {
        menu.removeVertex();
    });
};
    DeleteMenu.prototype = new google.maps.OverlayView();

    DeleteMenu.prototype.onAdd = function() {
        var deleteMenu = this;
        var map = this.getMap();
        this.getPanes().floatPane.appendChild(this.div_);

        // mousedown anywhere on the map except on the menu div will close the
        // menu.
        this.divListener_ = google.maps.event.addDomListener(map.getDiv(), 'mousedown', function(e) {
            if (e.target != deleteMenu.div_) {
            deleteMenu.close();
            }
        }, true);
    };

    DeleteMenu.prototype.onRemove = function() {
        google.maps.event.removeListener(this.divListener_);
        this.div_.parentNode.removeChild(this.div_);

        // clean up
        this.set('position');
        this.set('path');
        this.set('vertex');
    };

    DeleteMenu.prototype.close = function() {
        this.setMap(null);
    };

    DeleteMenu.prototype.draw = function() {
        var position = this.get('position');
        var projection = this.getProjection();

        if (!position || !projection) {
            return;
        }

        var point = projection.fromLatLngToDivPixel(position);
        this.div_.style.top = point.y + 'px';
        this.div_.style.left = point.x + 'px';
    };

    /**
     * Opens the menu at a vertex of a given path.
     */
    DeleteMenu.prototype.open = function(map, path, vertex) {
        this.set('position', path.getAt(vertex));
        this.set('path', path);
        this.set('vertex', vertex);
        this.setMap(map);
        this.draw();
    };

    /**
     * Deletes the vertex from the path.
     */
    DeleteMenu.prototype.removeVertex = function() {
        var path = this.get('path');
        var vertex = this.get('vertex');

        if (!path || vertex == undefined) {
            this.close();
            return;
        }

        path.removeAt(vertex);
        this.close();
    };

function doStuffWithLatLOng(vertexCoords){
        // I have my coordinates broken out from the arrays
        console.log(vertexCoords.lat(), vertexCoords.lng())
        
       
}



// loads event listner for the page loading 
google.maps.event.addDomListener(window, 'load', initMap);