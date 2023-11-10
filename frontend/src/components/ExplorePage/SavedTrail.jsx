import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';
import NavigationBar from "../Navigation";
import { useLoadScript } from "@react-google-maps/api";
import SavedTrailIndex from "./SavedTrailIdex";
import TrailMap from "../GoogleMap";
import { useHistory } from "react-router-dom";
import { fetchTrails } from "../../store/trail";

const SavedTrailPage = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const trails = useSelector(state => Object.values(state.likes.likedTrails));
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
            <NavigationBar />
            <div className="google-map-module">
                <SavedTrailIndex highlightedTrail={highlightedTrail} setHighlightedTrail={setHighlightedTrail} />
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

export default SavedTrailPage;
