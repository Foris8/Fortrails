import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrails, getTrails } from '../../../store/trail';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import TrailLikeButton from './TrailLikeButton';


const TrailShowPageItems = ({ trail }) => {
    const history = useHistory();
    const { trailName, description, lat, lng, photoUrl, difficulty, averageRating, totalNumRating } = trail;
    
    

    const handleClickTrailImg = (e) => {
        history.push(`/trails/${trail.id}`)
    }

    

    return (
        <div className='trail-contents' >
            <div className={"trail-photo"}>
                {photoUrl && <img
                    src={photoUrl}
                    alt="Trail Image"
                    className={"trail-item-image"}
                    onClick={handleClickTrailImg}
                />}
                <div className="trail-like-button">
                    <TrailLikeButton trailId={trail.id} />
                </div>
            </div>
                       
            <div className='trail-content'>
                <div className='trail-content-rating'>
                    <span>{difficulty} </span>
                    <span>• </span>
                    <span>
                        <FontAwesomeIcon icon={faStar} style={{ color: "#59e871", }} />
                    </span>

                    <span> {averageRating} </span>
                    <span>({totalNumRating})</span>
                </div>

                <div className='trail-content-name'>
                    <span>{trailName}</span>
                </div>


            </div>

        </div>
    )

}

export default TrailShowPageItems;