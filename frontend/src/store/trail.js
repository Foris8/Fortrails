import csrfFetch from "./csrf.js";

//action constant
export const RECEIVE_TRAILS = 'trails/RECEIVE_TRAILS';
export const RECEIVE_TRAIL = 'trails/RECEIVE_TRAIL';

//action creater
export const receiveTrails = trails =>{
    return({
        type: RECEIVE_TRAILS,
        trails
    })
}

export const receiveTrail = trail =>{
    return({
        type: RECEIVE_TRAIL,
        trail
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
        const trail = await res.json();
        dispatch(receiveTrail(trail));
    } 
}

const trailReducer = (state={},action) =>{
    const nextState = {...state};

    switch (action.type){
        case RECEIVE_TRAILS:
            return {...action.trails};
        case RECEIVE_TRAIL:
            nextState[action.trail.id] = action.trail;
            return nextState
        default:
            return state;
    }
};

export default trailReducer;


