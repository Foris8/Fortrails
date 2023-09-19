import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import NavigationBar from "../Navigation";
import BackgroundImageChanger from "./backGroundImgItem";
import "./index.css"
import searchBar from "./search.png"




function MainPage() {
    return(
        <div>
        
            <NavigationBar />
           

            <div className="SearchBarContainer">

                

                <div className="SearchBarContents">
                    <div className="SearchBarTitle">
                        <p>Find your outdoors </p>
                    </div>

                    <div className="form-group has-feedback has-search">
                        <div className="search-icon">
                            <img src={searchBar} alt="Search" />
                        </div>

                        <input type="text" className="SearchBarInput" placeholder="Search" />
                    </div>

                    <div>
                        <p>Explore nearby trails</p>
                    </div>
                </div>

                <BackgroundImageChanger className="ImgChanger" />
            </div>

            
      
        </div>
    )
}

export default MainPage;