import csrfFetch from "./csrf";

export const GET_SEARCH_RESULTS = 'search/searchResults';
export const CLEAR_SEARCH_RESULTS = 'search/clearSearchResults'

//action creators
export const receiveSearchResults = searchResults =>({
    type: GET_SEARCH_RESULTS,
    searchResults
});

export const clearSearchResults = () =>({
    type: CLEAR_SEARCH_RESULTS
});


//Thunk action creator
export const fetchSearchResults = (query) => async dispatch =>{
    const res = await csrfFetch(`api/trails/search?query=${query}`)
    const data = await res.json();

    dispatch(receiveSearchResults(data));

}

const searchReducer = (state={}, action) =>{
    const newState = {...state}

    switch (action.type){
        case GET_SEARCH_RESULTS:
            return {...action.searchResults.trails}
        case CLEAR_SEARCH_RESULTS:
            return {};
        default:
            return newState;
    }
}

export default searchReducer;