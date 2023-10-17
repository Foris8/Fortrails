import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails, getTrails } from '../../../store/trail';
import TrailIndexItem from './TrailIndexItem';
import './index.css';
import AllTrailIndexItems from './AllTrailsIndex';


const MainTrailIndex = ({ highlightedTrail, setHighlightedTrail }) => {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);


    useEffect(() => {
        dispatch(fetchTrails());
    }, [dispatch]);
    
    return (
        <div className='main-page-trail-item-container'>
            <ul className='main-page-trail-item-list'>
                {trails.map((trail) => {
                  
                    return <AllTrailIndexItems 
                    trail={trail} 
                    key={trail.id} 

                     />
                
    
                })}
            </ul>
        </div>
    );
};

export default MainTrailIndex;
