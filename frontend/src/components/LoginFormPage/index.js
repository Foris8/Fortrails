import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css';
import { Redirect } from "react-router-dom";
import { Link, useParams } from 'react-router-dom';
import NavigationBar from "../Navigation";


function LoginFormPage(){
    const dispatch = useDispatch();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [errors, setErrors] = useState({ email: "", password: "", general: [] });
    //check if there is an user already logged in
    const sessionUser = useSelector(state => state.session.user);

    // if (sessionUser) return <Redirect to="/" />;


    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = { email: "", password: "", general: [] };

        if (!email) newErrors.email = "Email cannot be blank";
        if (!password) newErrors.password = "Password cannot be blank";

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        setErrors({ email: "", password: "", general: [] });

        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) newErrors.general = data.errors;
                else if (data) newErrors.general = [data];
                else newErrors.general = [res.statusText];

                setErrors(newErrors);
            });
    };


    const handleDemoLogin = (e) =>{
        setEmail('demo@user.io');
        setPassword('password');
    }

    if (sessionUser){
        return(
            <Redirect to="/"/>
        )
    }else{
        return (
            <>
                <NavigationBar/>
    
                <div className="LoginSignupLayout-module">

                    <picture className="LoginSignupLayout-module-picture">
                        <img src="https://cdn-assets.alltrails.com/assets/packs/6c3153dde95ee18f954b.jpg" alt="On one side, a person stands in the shadow of stunning red-rock formations, on the other, a woman smiles joyfully in a field with a flower over one ear." className="LoginSignupLayout-module__img"></img>
                    </picture>

                    <div className="LoginForm-module-container">
                        <h1>
                            Welcome back
                            <br />
                            Log in and start exploring.
                        </h1>

                        <form onSubmit={handleSubmit} className="LoginInFormComponent">
                            

                            <div className="emailInputBox MuiInputBase-root">
                                <input type="text" id="emailInputBox" name="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                                
                            </div>
                            {errors.email && <span className="error">{errors.email}</span>}

                            <div className="passwordInputBox MuiInputBase-root">
                                <input type="password" id="passwordInputBox" name="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            {errors.password && <span id="error">{errors.password}</span>}

                            <ul>
                                {errors.general && <div id="error">{errors.general}</div>}
                            </ul>
                            
                            <button type="submit" className="login-button MuiInputBase-roo">Log In</button>
                            
                            <button type="submit" className="login-button" id="demo-login" onClick={handleDemoLogin}>Demo Login</button>

            
                        </form>
                        
                        

                        <Link to="/signup" className="signup-link">Sign Up</Link>


                    </div>

                    

                    
                </div>

            
            </>
        )
    }

    
}

export default LoginFormPage;