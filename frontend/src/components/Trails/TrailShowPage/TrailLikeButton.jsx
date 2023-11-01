import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../../store/like';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { fetchLikedTrails } from '../../../store/like';

const TrailLikeButton = ({ trailId }) => {
    const dispatch = useDispatch();
    const likedTrails = useSelector(state => state.likes.likedTrails);
    // const isLiked = likedTrails.includes(trailId);
    const currentUserId = useSelector(state => state.session.user.id);
    const userId = useSelector(state => state.session.user.id);
    const isLiked = likedTrails.some(trail => trail.id === trailId);

    useEffect(() => {
        dispatch(fetchLikedTrails(userId));
    }, [dispatch, userId]);



    const handleLikeClick = async () => {
        await dispatch(toggleLike(trailId, isLiked, currentUserId));
        dispatch(fetchLikedTrails(userId)); // Fetch the likes trail after click the btn
    };

    return (
        <button onClick={handleLikeClick} className='like-button'>
            <FontAwesomeIcon icon={faHeart} style={{ color: isLiked ? 'red' : 'grey' }} />
        </button>
    );
}; 

export default TrailLikeButton;
