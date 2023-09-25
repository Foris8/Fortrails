import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails, getTrails } from '../../../store/trail';
import { useHistory } from 'react-router-dom';



const TrailIndexItem = ({trail}) =>{
    const history = useHistory();
    const handleClickTrailImg = (e) =>{
        history.push('/trails/:trailId')
    }

    return(
        <div className='trail-contents' >
            <img
                src="https://placehold.co/600x400"
                alt="Image"
                className='trail-item-image'
                onClick={handleClickTrailImg}

            />
            <p>{trail.trailName}</p>
            <p>{trail.description}</p>
        </div>
    )

}

export default TrailIndexItem;