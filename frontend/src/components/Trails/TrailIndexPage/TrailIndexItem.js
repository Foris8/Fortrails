import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails, getTrails } from '../../../store/trail';


const TrailIndexItem = ({trail}) =>{

    return(
        <div className='trail-contents' >
            <img
                src="https://placehold.co/600x400"
                alt="Image"
                className='trail-item-image'

            />
            <p>{trail.trailName}</p>
            <p>{trail.description}</p>
        </div>
    )

}

export default TrailIndexItem;