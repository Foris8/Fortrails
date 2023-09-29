import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import './singleTrail.css';

function TrailMap({ trail }) {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);

    // Create the map
    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: {
                    lat: trail.lat,
                    lng: trail.lng,
                },
                zoom: 11,
                clickableIcons: false,
            }));
        }
    }, [map, trail]);

    // Add a marker for the single trail
    useEffect(() => {
        if (map) {
            const marker = new window.google.maps.Marker({
                map,
                position: new window.google.maps.LatLng(trail.lat, trail.lng),
                title: `${trail.trailName}`,

            });
        }
    }, [map, trail]);

    return (
        <div ref={mapRef} className="single-map">
            
        </div>
    );
}

function SingleTrailMapWrapper(props) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <TrailMap {...props} />
        </Wrapper>
    );
}

export default SingleTrailMapWrapper;
