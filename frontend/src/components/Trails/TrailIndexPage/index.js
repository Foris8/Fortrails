import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails, getTrails } from '../../../store/trail';

const TrailIndexPage = () => {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);

    useEffect(() => {
        dispatch(fetchTrails());
    }, [dispatch]);
    console.log(trails); 

    return (
        <div>
            <h1>Trails</h1>
            <ul>
                {trails.map((trail) => {
                    console.log(trail);

                    return(
                        <li key={trail.id}>
                            <p>{trail.id}</p>
                            <p>Trail Name: {trail.trailName}</p>
                            <p>Description: {trail.description}</p>
                            <p>Latitude: {trail.lat}</p>
                            <p>Longitude: {trail.lng}</p>
                        </li>
                    )
                    
                })}
            </ul>
        </div>
    );
};

export default TrailIndexPage;
