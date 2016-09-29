/**
 * Created by alex on 29.09.16.
 */

$(function () {

    //HTML Objects
    var $getEarthquakeBtn;
    var $markerInformationSpan;
    var $googleMapSection;

    //Google map object
    var googleMapObject;

    //US GOV API URL
    var usGovUrl = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

    //init
    var init = function () {

        var setHTMLObjects = function () {
            $getEarthquakeBtn = $("#getEarthquakeBtn");
            $markerInformationSpan = $("#markerInformationSpan");
            $googleMapSection = $("#googleMapSection").get(0);

        }(); //end setHTMLObjects

        var setEvents = function () {
            $getEarthquakeBtn.on("click", function () {
                getUSGovFeed();
            });
        }(); //end setEvents

        var initGoogleMap = function () {
            var googleMapConfig = {
                zoom: 2,
                center: new google.maps.LatLng(0, 0)
            };

            googleMapObject = new google.maps.Map($googleMapSection, googleMapConfig);
        }(); // end initGoogleMap

        createMarker(59.91607876, 10.7599517, "Westerdals");

    }(); //end init

    function getUSGovFeed() {
        $.getJSON(usGovUrl)
            .done(function (eqResult) {
                createAllMarkers(eqResult.features);
            })
            .fail(function () {
                alert("FAIL");
            });
    }

    //Application logic
    function createAllMarkers(earthquakes) {
        $.each(earthquakes, function (i, earthquake) {
            var title = earthquake.properties.place;
            var latitude = earthquake.geometry.coordinates[1];
            var longitude = earthquake.geometry.coordinates[0];

            createMarker(latitude, longitude, title);
        });
    }

    function createMarker(latitude, longitude, information) {
        var newMarker = new google.maps.Marker(
            {
                title: information,
                label: "V",
                position: new google.maps.LatLng(latitude, longitude),
                map: googleMapObject,
                information: information
            }
        );

        newMarker.addListener("mouseover", function () {
            $markerInformationSpan.html(this.information);
        });
    }// end createMarker


});