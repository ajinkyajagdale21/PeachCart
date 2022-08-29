import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { signUpValidation } from "../util";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const SignUp = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const signUpSubmitHandler = async (e) => {
    e.preventDefault();
    if (signUpValidation(userInput, setError)) {
      try {
        const {
          data: { success },
        } = await axios.post(
          `https://afternoon-escarpment-40154.herokuapp.com/auth/signup`,
          {
            firstName: userInput?.firstName,
            lastName: userInput?.lastName,
            email: userInput?.email,
            password: userInput?.password,
          }
        );
        if (success) {
          navigate("/login");
          toast.success("Signed Up succesfully");
        }
      } catch (error) {
        toast.error("Didn't Signed Up Please try again!!");
      }
    }
  };
  return (
    <form onSubmit={signUpSubmitHandler} className="sign-up">
      <h1>SIGN UP</h1>
      <input
        type="text"
        className="input-container"
        placeholder="Enter your First Name"
        value={userInput.firstName}
        onChange={(e) =>
          setUserInput((prev) => ({ ...prev, firstName: e.target.value }))
        }
      />
      <small>{error.firstNameError}</small>
      <input
        type="text"
        value={userInput.lastName}
        className="input-container"
        placeholder="Enter your Last Name"
        onChange={(e) =>
          setUserInput((prev) => ({ ...prev, lastName: e.target.value }))
        }
      />
      <small>{error.lastNameError}</small>
      <input
        type="text"
        className="input-container"
        placeholder="Enter your Email address"
        value={userInput.email}
        onChange={(e) =>
          setUserInput((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <small>{error.emailError}</small>
      <div className="text-password">
        <input
          type={showPassword ? "text" : "password"}
          className="input-container"
          placeholder="Enter your Password"
          value={userInput.password}
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <span
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </span>
      </div>
      <small>{error.passwordError}</small>

      <div className="text-password">
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="input-container"
          placeholder="ReEnter your Password"
          value={userInput.confirmPassword}
          onChange={(e) =>
            setUserInput((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
        />
        <span
          onClick={() => {
            setConfirmPassword((prev) => !prev);
          }}
        >
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </span>
      </div>
      <small>{error.confirmPasswordError}</small>

      <div>
        <button type="submit" className="primary button">
          SignUp
        </button>
      </div>
      <small>Already have Account?</small>
      <Link to="/login" style={{ textDecoration: "none", color: "peachpuff" }}>
        {" "}
        <button className="secondary button">Login </button>
      </Link>
    </form>
  );
};
