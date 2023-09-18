import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import LogOutButton from "../LogOutPage";
import { useDispatch, useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";

function NavigationBar(){
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser){
        return(
            <>
                <LogOutButton />
            </>
        )
    }else{
        return(
            <>
            <LoginFormPage/>
            </>
        )
    }

    
}

export default NavigationBar;