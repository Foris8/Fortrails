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
                <NavigationBar/>
    
                <div className="LoginSignupLayout-module">

                    <picture className="LoginSignupLayout-module-picture">
                        <img src="https://cdn-assets.alltrails.com/assets/packs/6c3153dde95ee18f954b.jpg" alt="On one side, a person stands in the shadow of stunning red-rock formations, on the other, a woman smiles joyfully in a field with a flower over one ear." className="LoginSignupLayout-module__img"></img>
                    </picture>

                    <div className="LoginForm-module-container">
                        <div className="LoginForm-mLoginForm-module">
    

                            <form onSubmit={handleSubmit} className="LoginInFormComponent">
                                <h1>
                                    Welcome back
                                    <br />
                                    Log in and start exloring.
                                </h1>

                                <ul>
                                    {errors.map(error => <li key={error}>{error}</li>)}
                                </ul>

                                <div className="emailInputBox MuiInputBase-root">
                                    <input type="text" id="emailInputBox" name="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                                </div>

                                <div className="passwordInputBox MuiInputBase-root">
                                    <input type="password" id="passwordInputBox" name="password" placeholder="Passoword" value={password} onChange={(e) => { setPassowrd(e.target.value) }} />
                                </div>
                                
                                
                                <button type="submit">Log In</button>

                                <Link to="/signup">Sign Up</Link>
                            </form>

                        </div>


                    </div>

                    

                    
                </div>

            
            </>
        )
    }

    
}

export default LoginFormPage;