
// the following requires libraries=geometry


// there needs to be a way to start a random number genterator to start spitting out lat lng cordinates within a range that uses the geolocation point as it's center

// those cordinates are then checked with the following if else statement to see if they are within the polygon the user draws



//bermudaTriangle changed to name of polyline array that holds the user drawn data
if(google.maps.geometry.poly.containsLocation(event.latLng, bermudaTriangle)=true){
// it is inside the polygon
//if it is inside the polygon we want to continue to next action in
} else {
//it is outside the polygon do nothing and continue search for a number inside the polygon ...recursion?
}



