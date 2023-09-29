import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchResults, fetchSearchResults } from "../../store/search";
import { useHistory } from "react-router-dom";

function MainSearch() {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const searchResults = useSelector(state=>Object.values(state.search))

    const handleChange = (e)=>{
        const query = e.target.value;
        setSearchText(query)

        if (query.trim() !== ""){
            dispatch(fetchSearchResults(query))
        }else{
            dispatch(clearSearchResults())
        }
    }

    function handleClickLink(id){
        return(e) => {
            e.preventDefault();
            history.push(`/trails/${id}`);
            dispatch(clearSearchResults())
            setSearchText("")
        }
    }

    return (
        <>
            <input type="text" 
            className="SearchBarInput" 
            placeholder="Search by city, park, or trail name" 
            value={searchText}
            onChange={handleChange}
            />


            {searchText && 
                <div className="drop-down-container">
                    <ul id="search=dropdown">
                        {searchResults.map(result => {
                            return (
                                <li key={result.id} onClick={handleClickLink(result.id)} className="search-dropdown-item">
                                    {result.trailName}
                                </li>
                            )
                        })}
                    </ul>
                </div>
               
            }
        </>
    )
}

export default MainSearch;