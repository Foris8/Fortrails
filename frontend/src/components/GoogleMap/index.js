import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from "react-router-dom";
import './index.css';

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

    // Create the map
    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: {
                    lat: 40.7128,
                    lng: -74.0060
                }, // New York
                zoom: 13,
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
                    label: {
    
                        fontWeight: 'bold',
                        color: 'black'
                    },
                    icon: {
                        path: `
              M 1,0 
              L 2,0 
              A 1 1 0 0 1 3,1
              A 1 1 0 0 1 2,2
              L 1,2 
              A 1 1 0 0 1 0,1
              A 1 1 0 0 1 1,0
              z
            `,
                        fillOpacity: 1,
                        fillColor: 'white',
                        strokeColor: 'black',
                        strokeWeight: 1,
                        scale: 15,
                        labelOrigin: new window.google.maps.Point(1.5, 1),
                        anchor: new window.google.maps.Point(1.5, 1)
                    },
                });
                debugger

                Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                    marker.addListener(event, () => handler(trail));
                });
                markers.current[trail.id] = marker;
            })

            // Remove markers for old trails
            Object.entries(markers.current).forEach(([trailId, marker]) => {
                if (trails.some(trail => trail.id === trailId)) return;

                marker.setMap(null);
                delete markers.current[trailId];
            })
        }
    }, [trails, history, map, markerEventHandlers]);

    // Change the style for bench marker on hover
    useEffect(() => {
        Object.entries(markers.current).forEach(([trailId, marker]) => {
            const label = marker.getLabel();
            const icon = marker.getIcon();

            if (parseInt(trailId) === highlightedTrail) {
                marker.setLabel({ ...label, color: 'white' });
                marker.setIcon({ ...icon, fillColor: 'black' });
            } else {
                marker.setLabel({ ...label, color: 'black' });
                marker.setIcon({ ...icon, fillColor: 'white' });
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