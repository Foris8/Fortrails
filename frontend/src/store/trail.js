import csrfFetch from "./csrf.js";
import { receiveUser, receiveUsers } from "./userReducer.js";
import { addReviews } from "./review.js";

//action constant
export const RECEIVE_TRAILS = 'trails/RECEIVE_TRAILS';
export const RECEIVE_TRAIL = 'trails/RECEIVE_TRAIL';


export const ADD_TRAIL = 'trails/ADD_TRAIL';
export const REMOVE_TRAIL = 'trails/REMOVE_TRAIL';
export const UPDATE_TRAIL = 'trails/UPDATE_TRAIL';


export const addTrail = trail => ({
    type: ADD_TRAIL,
    trail
});

export const removeTrail = trailId => ({
    type: REMOVE_TRAIL,
    trailId
});

export const updateTrail = trail => ({
    type: UPDATE_TRAIL,
    trail
});


export const createTrail = trailData => async dispatch => {
    
    const res = await csrfFetch(`/api/trails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trailData)
    });

    if (res.ok) {
        const trail = await res.json();
        dispatch(addTrail(trail));
    }
};

export const deleteTrail = trailId => async dispatch => {
    const res = await csrfFetch(`/api/trails/${trailId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeTrail(trailId));
    }
};

export const editTrail = (trailId, trailData) => async dispatch => {
    const res = await csrfFetch(`/api/trails/${trailId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trailData)
    });

    if (res.ok) {
        const trail = await res.json();
        
        dispatch(updateTrail(trail));
    }
};



//action creater
export const receiveTrails = trails =>{
    return({
        type: RECEIVE_TRAILS,
        trails
    })
}

export const receiveTrail = data =>{
    return({
        type: RECEIVE_TRAIL,
        data
    })
}

//selector and returns from store
export const getTrails = state =>{

    if(state.trails) return Object.values(state.trails);
    return [];
}

export const getTrail = trailId =>{
    return (state) =>{
        if (state.trails) return state.trails[trailId];
        return null;
    }
}


//function to fetch data
export const fetchTrails = ()=> async dispatch =>{
    const res = await csrfFetch(`/api/trails`);
    if (res.ok){
        const trails = await res.json();
        dispatch(receiveTrails(trails));
    }
}

export const fetchTrail = trailId => async dispatch =>{
    const res  = await csrfFetch(`/api/trails/${trailId}`);
    if (res.ok){
        const data = await res.json();
       
        dispatch(receiveTrail(data.trail));
        dispatch(receiveUsers(data.users));
        dispatch(addReviews(data.reviews));
        
    } 
}

const trailReducer = (state={},action) =>{
    const nextState = {...state};

    switch (action.type){
        case RECEIVE_TRAILS:
            return {...action.trails};
        case RECEIVE_TRAIL:
            const trailId = Object.keys(action.data)[0];
            nextState[trailId] = action.data[trailId];
            return nextState;
        case ADD_TRAIL:
            const newTrailId = Object.keys(action.trail)[0];
            nextState[newTrailId] = action.trail[newTrailId];
            return nextState;
        case REMOVE_TRAIL:
            delete nextState[action.trailId];
            return nextState;
        case UPDATE_TRAIL:
            const updatedTrailId = Object.keys(action.trail)[0];
            nextState[updatedTrailId] = action.trail[updatedTrailId];
            return nextState;
        default:
            return state;
    }
};

export default trailReducer;


