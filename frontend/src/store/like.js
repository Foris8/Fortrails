import csrfFetch from "./csrf.js";

export const LIKE_TRAIL = 'LIKE_TRAIL';
export const UNLIKE_TRAIL = 'UNLIKE_TRAIL';
export const SET_LIKE_ERROR = 'SET_LIKE_ERROR';

export const likeTrail = (trailId) => ({
    type: LIKE_TRAIL,
    payload: trailId
});

export const unlikeTrail = (trailId) => ({
    type: UNLIKE_TRAIL,
    payload: trailId
});

export const setLikeError = (error) => ({
    type: SET_LIKE_ERROR,
    payload: error
});

export const SET_LIKED_TRAILS = 'SET_LIKED_TRAILS';

export const setLikedTrails = (likedTrails) => ({
    type: SET_LIKED_TRAILS,
    payload: likedTrails
});

export const fetchLikedTrails = (userId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/users/${userId}/liked_trails`);
        const data = await response.json();
        
        if (response.ok) {
            dispatch(setLikedTrails(data.likedTrails));
        } else {
            dispatch(setLikeError(data.message));
        }
    } catch (error) {
        dispatch(setLikeError(error.toString()));
    }
};

export const toggleLike = (trailId, isLiked, userId) => async (dispatch) => {
    try {
        const response = isLiked ? 
            await csrfFetch(`/api/likes`, { method: 'DELETE', body: JSON.stringify({ trail_id: trailId, user_id: userId}) }) :
            await csrfFetch(`/api/likes`, { method: 'POST', body: JSON.stringify({ trail_id: trailId, user_id:userId }) });

        const data = await response.json();

        if (data.status === 'success') {
            isLiked ? dispatch(unlikeTrail(trailId)) : dispatch(likeTrail(trailId));
        } else {
            dispatch(setLikeError(data.message));
        }
    } catch (error) {
        dispatch(setLikeError(error.toString()));
    }
};

const initialState = {
    likedTrails: [],
    error: null
};

export default function likesReducer(state = initialState, action) {
    switch (action.type) {
        case LIKE_TRAIL:
            return {
                ...state,
                likedTrails: [...state.likedTrails, action.payload],
                error: null
            };
        case UNLIKE_TRAIL:
            return {
                ...state,
                likedTrails: state.likedTrails.filter(id => id !== action.payload),
                error: null
            };
        case SET_LIKE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_LIKED_TRAILS:
            return {
                ...state,
                likedTrails: action.payload,
                error: null
            };
        default:
            return state;
    }
}