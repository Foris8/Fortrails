import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import NavigationBar from "../Navigation";

function MainPage() {
    return(
        <>
        <NavigationBar/>
        </>
    )
}

export default MainPage;