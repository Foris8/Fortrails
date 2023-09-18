import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css';
import { Redirect } from "react-router-dom";
import { Link, useParams } from 'react-router-dom';

function LoginFormPage(){
    const dispatch = useDispatch();
    const [email,setEmail] = useState();
    const [password,setPassowrd] = useState();
    const [errors, setErrors] = useState([]);
    //check if there is an user already logged in
    const sessionUser = useSelector(state => state.session.user);

    // if (sessionUser) return <Redirect to="/" />;


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if, e.g., server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    };

    if (sessionUser){
        return(
            <Redirect to="/"/>
        )
    }else{
        return (
            <>
                <h1>Log In</h1>
                <Link to="/signup">Sign Up</Link>
                

                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <label>Email
                        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </label>
                    <br />

                    <label>Password
                        <input type="password" value={password} onChange={(e) => { setPassowrd(e.target.value) }} />
                    </label>

                    <br />
                    <button type="submit">Log In</button>
                </form>
            </>
        )
    }

    
}

export default LoginFormPage;