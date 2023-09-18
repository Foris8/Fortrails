import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";

function LogOutButton(){
    const dispatch = useDispatch();

    const handleButtonClick = (e) =>{
        e.preventDefault();

        return dispatch(sessionActions.logout())
    }


    return (
        <>
            <button onClick={handleButtonClick} >
                Log Out
            </button>
        </>
    )

}

export default LogOutButton;



