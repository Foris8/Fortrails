import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails, getTrails } from '../../../store/trail';
import TrailIndexItem from './TrailIndexItem';
import './index.css';

const TrailIndexPage = () => {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);

    useEffect(() => {
        dispatch(fetchTrails());
    }, [dispatch]);
    console.log(trails); 

    return (
        <div className='trail-item-container'>
            <h1>Trails</h1>
            <ul className='trail-item-list'>
                {trails.map((trail) => {
                  
                    return <TrailIndexItem trail={trail} key={trail.id} />
                
    
                })}
            </ul>
        </div>
    );
};

export default TrailIndexPage;
