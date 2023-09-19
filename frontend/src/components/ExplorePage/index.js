import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import './index.css';
import { Link, useParams } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import NavigationBar from "../Navigation";

const ExplorePage = ()=>{
    return(
        <>
            <NavigationBar/>
            Explore page
        </>
    )
}

export default ExplorePage;