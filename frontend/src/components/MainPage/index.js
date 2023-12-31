import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import NavigationBar from "../Navigation";
import BackgroundImageChanger from "./backGroundImgItem";
import "./index.css"
import searchBar from "./search.png"
import { Link, useParams } from 'react-router-dom';
import Footer from "../Footer";
import MainSearch from "./MainSearch";
import MainTrailIndex from "../Trails/TrailIndexPage/MainTrails";
import RollingImages from "./RollingImg";

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
                        <MainSearch/>

                    </div>

                    <div>
                        <Link to="/explore" className="exploreLink">Explore nearby trails</Link>
                    </div>
                </div>
        
                <BackgroundImageChanger className="ImgChanger" />
            </div>

            <div className="main-page-middle-container">
                <p>Local favorites nearby</p>
                <div className="main-page-trail-container">
                    <MainTrailIndex/>
                </div>

                <RollingImages/>
            </div>
            
            

            <Footer/>
      
        </>
    )
}

export default MainPage;