import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchResults, fetchSearchResults } from "../../store/search";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


function MainSearch() {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const searchResults = useSelector(state=>Object.values(state.search))
    console.log(searchResults.length>0)

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
            <div className="search-container">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2xs" style={{color: "#d8dadf",}} className="search-icon" />
                <input type="text" 
                className="SearchBarInput" 
                placeholder="Search by city, park, or trail name" 
                value={searchText}
                onChange={handleChange}
                style={{ paddingLeft: '40px' }}
                />
            </div>
        
           

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