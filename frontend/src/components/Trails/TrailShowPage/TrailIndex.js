import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails, getTrails } from '../../../store/trail';
import TrailShowPageItems from './TrailIndexItems';
import './TrailIndex.css';
import AllTrailIndexItems from '../TrailIndexPage/AllTrailsIndex';

const TrailShowPageList = ({ }) => {
    const dispatch = useDispatch();
    const trails = useSelector(getTrails);



    useEffect(() => {
        dispatch(fetchTrails());
    }, [dispatch]);

    return (
        <div className='trail-item-container'>
            <ul className='trail-item-list'>
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

export default TrailShowPageList;
