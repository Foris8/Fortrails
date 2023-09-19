import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import logo from './fortrails.png';
import './index.css';
import { Link, useParams } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function NavigationBar(){
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleButtonClick = (e) => {
        e.preventDefault();

        return dispatch(sessionActions.logout())
    }

    const handleExploreClick= (e) =>{
        history.push('/explore')
    }

    return (
        <nav>
            <div className="left-panel">
                <Link to="/">
                    <img src={logo} alt='Logo' />
                </Link>
                <p>ForTrails</p>
                <p onClick={handleExploreClick}>Explore</p>
                <p>Saved</p>
            </div>
            
            <div className="right-panel">
                <p>Help</p>
                {sessionUser ? <button onClick={handleButtonClick} >
                    Log Out
                </button> : <Link to="/login" id="login-button">Log In</Link>}
            </div>
            
        </nav>
    )
}

export default NavigationBar;