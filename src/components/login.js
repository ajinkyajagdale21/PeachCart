import React,{useState} from 'react';
import {Visibility,VisibilityOff} from '@material-ui/icons';
import { validation } from '../util';
import {Link} from 'react-router-dom';

export const Login=()=>{
    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const [error, setError] = useState({ emailError: "", passwordError: "" });
    const loginSubmitHandler=(e)=>{
        e.preventDefault();
    if (validation(email, password, setError)) {
    }
    }
    return(
        <form onSubmit={loginSubmitHandler} className="login">
            <h1>Login</h1>
            <div>
            <input 
            type="text"
            className="input-container"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}    
            />
            <small className="error">{error.emailError}</small>
            </div>
            <div>
            <input 
            type= {showPassword?"text":"password"}
            className="input-container"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <span onClick={()=>setShowPassword(prev=>!prev)}>{showPassword?<Visibility/>:<VisibilityOff/>}</span>
            <small className="error">{error.passwordError}</small>
            </div>
            <button type="submit" className="primary button">
            Log In
            </button>
            <div>
                <small>Don't have Account?</small>
               <Link to ="/signup"> <button className="secondary button">SignUp Here</button> </Link>
            </div>           
        </form>
    )
}