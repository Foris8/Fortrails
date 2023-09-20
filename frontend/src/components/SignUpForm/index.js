import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import NavigationBar from "../Navigation";
import "./index.css"
import logo from './fortrails.png';
import arrow from './backArrow.png'
import { useHistory } from 'react-router-dom';


function SignUpForm(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, firstName,lastName, password }))
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
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const handleArrowClick = (e)=>{

        history.push('/login')
    }


    return (
        <>
            <NavigationBar/>

            <div className="signup-form-module">
                

                <picture className="singup-module-picture">
                    
                    <img src="https://cdn-assets.alltrails.com/assets/packs/cac6fbd783c101b0c3e0.jpg" alt="On one side, a person stands in the shadow of stunning red-rock formations, on the other, a woman smiles joyfully in a field with a flower over one ear." className="signup-module__img"></img>
                </picture>

                <div className="sign-up-form-container">
                    <div className="arrow">
                        <img src={arrow} id="arrow" onClick={handleArrowClick}></img>
                    </div>
                    

                    <img src={logo}></img>
                    <h1>
                        Create your free account
                    </h1>

                    <form onSubmit={handleSubmit} className="SignUpFormComponent">
                        
                            
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            placeholder="First Name"
                        />
                       
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            placeholder="Last Name"
                        />
              

                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email address"
                        />

 
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
   

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm password"
                            />

                        <ul>
                            {errors.map((error) => <li key={error}>{error}</li>)}
                        </ul>

                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUpForm;
