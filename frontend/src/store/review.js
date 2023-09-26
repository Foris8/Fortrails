import csrfFetch from "./csrf.js";
import { receiveTrail, RECEIVE_TRAIL } from "./trail.js";
import { receiveUser } from "./userReducer.js";


const ADD_REVIEW = 'reviews/addReview';
const ADD_REVIEWS = 'reviews/addReviews';
const REMOVE_REVIEW = 'reviews/removeReview';

const addReview = review => ({
    type: ADD_REVIEW,
    payload: review
});

const removeReview = review => ({
    type: REMOVE_REVIEW,
    payload: review
});

export const addReviews = reviews => ({
    type: ADD_REVIEWS,
    payload: reviews
});


export const fetchReviews = () => async dispatch => {
    const res = await csrfFetch(`/api/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        debugger

        dispatch(addReviews(reviews));
    }
}

export const getTrailReviews = trailId => state => (
    Object.values(state.reviews)
        .filter(review => review.trailId === trailId)
        .map(review => ({
            ...review,
            author: state.users[review.authorId]?.email
        }))
);

export const createReview = (review) => async dispatch => {
    const response = await csrfFetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(review)
    });
    const data = await response.json();
    dispatch(addReview(data.review));
    dispatch(receiveUser(data.user));
    dispatch(receiveTrail(data.trail));
    return response;
};

export const destroyReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });
    const data = await response.json();
    dispatch(removeReview(data.review));
    dispatch(receiveTrail(data.trail));
    return response;
};

function reviewsReducer(state = {}, action) {
    switch (action.type) {
        case ADD_REVIEW: {
            const review = action.payload;
            return { ...state, [review.id]: review };
        }
        case REMOVE_REVIEW: {
            const review = action.payload;
            const { [review.id]: _remove, ...newState } = state;
            return newState;
        }
        case ADD_REVIEWS:
            const reviews = action.payload;
            return { ...state, ...reviews };
        case RECEIVE_TRAIL:
            const trailReview = action.data.reviews
     
    
            return { ...state, ...trailReview}
        default:
            return state;
    }
}

export default reviewsReducer;
