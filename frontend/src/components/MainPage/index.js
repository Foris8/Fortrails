import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import NavigationBar from "../Navigation";
import BackgroundImageChanger from "./backGroundImgItem";
import "./index.css"
import searchBar from "./search.png"
import { Link, useParams } from 'react-router-dom';




function MainPage() {
    return(
        <>
            <NavigationBar/>
            <div className="SearchBarContainer">
                <div className="SearchBarContents">
                    <div className="SearchBarTitle">
                        <p>Find your outdoors </p>
                    </div>

                    <div className="form-group has-feedback has-search">
                        {/* <div className="search-icon">
                            <img src={searchBar} alt="Search" />
                        </div> */}

                        <input type="text" className="SearchBarInput" placeholder="Search by city, park, or trail name" />
                    </div>

                    <div>
                        <Link to="/explore" className="exploreLink">Explore nearby trails</Link>
                    </div>
                </div>

                <BackgroundImageChanger className="ImgChanger" />
            </div>

            
      
        </>
    )
}

export default MainPage;