import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from "react-router-dom";
import './index.css';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function TrailMap({
    trails,
    highlightedTrail,
    mapOptions = {},
    markerEventHandlers = {}
}) {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});
    const history = useHistory();
    const [routes, setRoutes] = useState([]);
    const directionsService = new window.google.maps.DirectionsService();
    
    function displayRoute(trail) {
        const request = {
            origin: new window.google.maps.LatLng(trail.startLat, trail.startLng),
            destination: new window.google.maps.LatLng(trail.endLat, trail.endLng),
            travelMode: 'WALKING'
        };

        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                const directionsRenderer = new window.google.maps.DirectionsRenderer({
                    map: map,
                    suppressMarkers: true, // We have our own markers, so suppress default markers
                    polylineOptions: {
                        strokeColor: '#038C3E',
                        strokeOpacity: 0.7,
                        strokeWeight: 4,
                        icons: [{
                            icon: {
                                path: 'M 0,-1 0,1',
                                strokeOpacity: 1,
                                scale: 4
                            },
                            offset: '0',
                            repeat: '20px'
                        }]
                    },
                    preserveViewport: true
                });
                directionsRenderer.setDirections(result);
                setRoutes((prevRoutes) => [...prevRoutes, directionsRenderer]); // Save the renderer to the state to manage it later
            } else {
                console.error(`Directions request failed due to ${status}`);
            }
        });
    }


    

    // Create the map
    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: {
                    lat: 40.769896,
                    lng: -73.695130
                }, // New York
                zoom: 11,
                clickableIcons: false,
                ...mapOptions,
            }));
        }
    }, [mapRef, map, mapOptions]);

    // Update map markers whenever `trails` changes
    useEffect(() => {
        if (map) {
            // Add markers for new trails
            trails.forEach((trail) => {
                if (markers.current[trail.id]) return;

                const marker = new window.google.maps.Marker({
                    map,
                    position: new window.google.maps.LatLng(trail.lat, trail.lng),
                    title: `${trail.trailName}`,
                    icon: {
                        path: faLocationDot.icon[4], // Use the FontAwesome icon path
                        fillColor: 'red', // Change the fill color
                        fillOpacity: 1, // Set the opacity
                        strokeColor: 'red', // Set the stroke color
                        strokeWeight: 1, // Set the stroke weight
                        scale: 0.05,
                    }
                });

                Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                    marker.addListener(event, () => handler(trail));
                });
                markers.current[trail.id] = marker;
            })

            // Remove markers for old trails
            Object.entries(markers.current).forEach(([trailId, marker]) => {
                if (trails.some(trail => trail.id.toString() === trailId)) return;

                marker.setMap(null);
                delete markers.current[trailId];
            })
        }
    }, [trails, history, map, markerEventHandlers]);

    // Change the style for bench marker on hover
    useEffect(() => {
        Object.entries(markers.current).forEach(([trailId, marker]) => {
            const icon = marker.getIcon();

            if (parseInt(trailId) === highlightedTrail) {
                marker.setIcon({ ...icon, fillColor: 'red', scale: 0.07 });
                routes.forEach(routeRenderer => routeRenderer.setMap(null));
                setRoutes([]);

                // Display the route for the selected trail
                displayRoute(trails[trailId-1]);
            } else {
                marker.setIcon({ ...icon, fillColor: 'red', scale: 0.05 });
                routes.forEach(routeRenderer => routeRenderer.setMap(null));
                setRoutes([]);
            }
        });
    }, [markers, highlightedTrail]);



    return (
        <div ref={mapRef} className="map">
            Map
        </div>
    );
}




function TrailMapWrapper(props) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <TrailMap {...props} />
        </Wrapper>
    );
}

export default TrailMapWrapper;