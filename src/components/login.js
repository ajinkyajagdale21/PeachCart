import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { validation } from "../util";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authContext";
import { setupAuthHeaderForServiceCalls } from "../util";
import toast from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation;
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    if (validation(email, password, setError)) {
      try {
        const {
          data: { name, token, userId },
          status,
        } = await axios.post(
          `https://new-api-peachcart-1jnt.vercel.app/auth/login`,
          { email, password }
        );
        if (status === 200) {
          authDispatch({ type: "LOGIN", payload: { name, token, userId } });
          localStorage?.setItem(
            "userDetails",
            JSON.stringify({ name, token, userId, login: true })
          );
          setupAuthHeaderForServiceCalls(token);
          navigate(state?.from ? state?.from : "/");
          toast.success("logged in succesfully");
        }
      } catch (error) {
        toast.error("please enter correct credentials");
      }
    }
  };
  return (
    <form onSubmit={loginSubmitHandler} className="login">
      <h1>Login</h1>
      <input
        type="text"
        className="input-container"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <small className="error">{error.emailError}</small>
      <div className="text-password">
        <input
          type={showPassword ? "text" : "password"}
          className="input-container"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </span>
      </div>
      <small className="error">{error.passwordError}</small>
      <button type="submit" className="primary button">
        Log In
      </button>
      <div>
        <small>Don't have Account?</small>
        <Link to="/signup">
          {" "}
          <button className="secondary button">SignUp Here</button>{" "}
        </Link>
      </div>
    </form>
  );
};
