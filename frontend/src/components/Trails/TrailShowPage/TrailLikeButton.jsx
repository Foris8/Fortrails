import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../../store/like';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { fetchLikedTrails } from '../../../store/like';
import { useHistory } from 'react-router-dom';

const TrailLikeButton = ({ trailId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const likedTrails = useSelector(state => state.likes.likedTrails);
    const sessionUser = useSelector(state => state.session.user);
    const isLiked = sessionUser && likedTrails.some(trail => trail.id === trailId);

    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchLikedTrails(sessionUser.id));
        }
    }, [dispatch, sessionUser]);

    const handleLikeClick = async (event) => {
        event.stopPropagation(); // Prevent event from bubbling up
        if (!sessionUser) {
            // If there is no logged-in user, redirect to the login page
            history.push('/login');
        } else {
            // If the user is logged in, toggle the like status
            await dispatch(toggleLike(trailId, isLiked, sessionUser.id));
            dispatch(fetchLikedTrails(sessionUser.id)); // Fetch the liked trails after clicking the button
        }
    };

    return (
        <button onClick={handleLikeClick} className='like-button'>
            <FontAwesomeIcon icon={faBookmark} size="3x" style={{ color: isLiked ? '#70B85D' : '#FFFEF1', opacity: 0.92 }} />
        </button>
    );
}; 

export default TrailLikeButton;
