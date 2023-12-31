import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails, getTrails } from '../../../store/trail';
import TrailIndexItem from './TrailIndexItem';
import './index.css';
import MainSearch from '../../MainPage/MainSearch';


const TrailIndexPage = ({ highlightedTrail, setHighlightedTrail }) => {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);


    useEffect(() => {
        dispatch(fetchTrails());
    }, [dispatch]);
    return (
        <div className='trail-item-container'>

            <ul className='trail-item-list'>
                {trails.map((trail) => {
                  
                    return <TrailIndexItem 
                    trail={trail} 
                    key={trail.id} 
                    isHighlighted={highlightedTrail === trail.id}
                    setHighlightedTrail={setHighlightedTrail}
                     />
                
    
                })}
            </ul>
        </div>
    );
};

export default TrailIndexPage;
