import csrfFetch from "./csrf";
import { RECEIVE_TRAIL } from "./trail";
// ACTION TYPES
const RECEIVE_USER = 'users/RECEIVE_USER';
const RECEIVE_USERS = 'users/RECEIVE_USERS';
const REMOVE_USER = 'users/REMOVE_USER';


// ACTION CREATORS
export const receiveUser = user => ({
    type: RECEIVE_USER,
    payload: user
});

export const removeUser = userId => ({
    type: REMOVE_USER,
    userId // userId: userId
});

// THUNK ACTION CREATORS
export const loginUser = user => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    dispatch(receiveUser(data.user))
};

export const logoutUser = userId => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    sessionStorage.setItem('currentUser', null)
    dispatch(removeUser(userId));
}

export const createUser = user => async dispatch => {
    let res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    dispatch(receiveUser(data.user));
}

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    payload: users
});



// REDUCER
const userReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_USER:

            nextState[action.payload.id] = action.payload;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        // case RECEIVE_TRAIL:
        //     const trailUsers = action.data.users
        //     return {...state, ...trailUsers}
        case RECEIVE_USERS:
            return {...state, ...action.payload}
        default:
            return state;
    }
};

export default userReducer