import React from 'react';

export const SignUp=()=>{
    return(
        <form className="sign-up">
            <h1>SIGN UP</h1>
            <div >
                <input  placeholder="Enter your First Name"/>
            </div>
            <div >
                <input  placeholder="Enter your Last Name"/>
            </div>
            <div >
                <input  placeholder="Enter your Email address"/>
            </div>
            <div >
                <input  placeholder="Enter your Password"/>
            </div>
            <div >
                <input  placeholder="ReEnter your Password"/>
            </div>
            <div>
                <button className="primary button">SignUp</button>
            </div>
            <small>Already have Account?</small>
            <button className="secondary button">Login</button>
        </form>
    )
}