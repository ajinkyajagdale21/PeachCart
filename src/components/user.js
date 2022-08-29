import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../authContext";
import { setupAuthHeaderForServiceCalls } from "../util";
import toast from "react-hot-toast";

export const User = () => {
  const {
    state: { name },
    authDispatch,
  } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("userDetails");
    setupAuthHeaderForServiceCalls(null);
    navigate("/");
    toast.success("logged out successfully");
  };
  return (
    <div style={{ margin: "8rem", textAlign: "center" }}>
      <h1> Welcome {name} !! </h1>
      <button className="primary button" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};
