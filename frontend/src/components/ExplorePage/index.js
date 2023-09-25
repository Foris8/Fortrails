import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import './index.css';
import { Link, useParams } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import NavigationBar from "../Navigation";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import TrailIndexPage from "../Trails/TrailIndexPage";

const ExplorePage = ()=>{
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    });
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    console.log(process.env.REACT_APP_GOOGLE_API_KEY)
    return (
        <>
            
            <NavigationBar/>
            
            <div className="google-map-module">
                <TrailIndexPage />

                <div className="google-map-container">
                    {!isLoaded ? (
                        <h1>Loading...</h1>
                    ) : (
                        <GoogleMap
                            mapContainerClassName="google-map"
                            center={center}
                            zoom={14}
                        >
                            <Marker position={{ lat: 80, lng: -80 }} />
                        </GoogleMap>
                    )}
                </div>

            </div>
            
        </>
        
    );
}


export default ExplorePage;