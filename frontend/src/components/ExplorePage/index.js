import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import './index.css';
import NavigationBar from "../Navigation";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import TrailIndexPage from "../Trails/TrailIndexPage";
import { fetchReviews } from "../../store/review";
import TrailMap from "../GoogleMap"
import { useHistory } from "react-router-dom";
import MainSearch from "../MainPage/MainSearch";
import { fetchTrails } from "../../store/trail";

const ExplorePage = ()=>{
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    });
    const center = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []);
    const history = useHistory();
    const dispatch = useDispatch();
    const trails = useSelector(state => Object.values(state.trails));
    const sessionUser = useSelector(state => state.session.user);

    const [highlightedTrail, setHighlightedTrail] = useState(null);


    useEffect(() => {
        if (!sessionUser) {
            // Redirect to login page if there is no logged-in user
            history.push('/login');
        } else {
            dispatch(fetchTrails());
        }
    }, [dispatch, sessionUser, history]);


    return (
        <>
            
            <NavigationBar/>
            <div className="google-map-module">
                
                <TrailIndexPage highlightedTrail={highlightedTrail} setHighlightedTrail={setHighlightedTrail} />

                <div className="google-map-container">
                    {!isLoaded ? (
                        <h1>Loading...</h1>
                    ) : (
                            <TrailMap
                                trails={trails}
                                markerEventHandlers={{
                                    click: (trail) => history.push(`/trails/${trail.id}`),
                                    mouseover: (trail) => setHighlightedTrail(trail.id),
                                    mouseout: () => setHighlightedTrail(null)
                                }}
                                highlightedTrail={highlightedTrail}
                            />
                    )}
                </div>

            </div>
            
        </>
        
    );
}


export default ExplorePage;