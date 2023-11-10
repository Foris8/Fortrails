import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails } from '../../store/trail';
import TrailIndexItem from '../Trails/TrailIndexPage/TrailIndexItem';
import './index.css';



const SavedTrailIndex = ({ highlightedTrail, setHighlightedTrail }) => {
    const dispatch = useDispatch();
    const allTrails = useSelector(state => Object.values(state.trails));
    const likeTrails = useSelector(state => Object.values(state.likes.likedTrails));

    useEffect(() => {
        dispatch(fetchTrails());
    }, [dispatch]);

    // Filter the allTrails array to include only those trails that are also in likeTrails
    const savedTrails = allTrails.filter(trail => likeTrails.some(likedTrail => likedTrail.id === trail.id));

    return (
        <div className='trail-item-container'>
            <ul className='trail-item-list'>
                {savedTrails.map((trail) => {
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

export default SavedTrailIndex;

