import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails, getTrails } from '../../../store/trail';
import NavigationBar from '../../Navigation';
import "./index.css"

const TrailShowPage = () =>{
    return(
        <>
            <NavigationBar/>

            <div className='main-content-box'>

                <div className='main-content-container'>
                    <img src="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTA2MDY1NDUvMGJmMTA0MDZjZDYwOGI0YWE2NGI5ZTBiMmU3ODRmMzAuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoyMDQ0LCJoZWlnaHQiOjYyNCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0=" alt="Long Path and Shore Loop, Palisades Interstate Park, Alpine, New Jersey, United States | AllTrails.com" className='trail-img'/>
                    <p>Long Path and Shoore Loop</p>
                    <p>Park Name</p>
                </div>
                
            </div>
        </>
    )
}

export default TrailShowPage;