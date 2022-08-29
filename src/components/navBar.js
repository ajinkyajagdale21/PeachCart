import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import { useData } from "../dataContext";

export const NavBar = () => {
  const {
    state: { login },
  } = useAuth();
  const { setToggleSideBar } = useData();
  return (
    <nav className="navigation">
      <div className="brand">
        <Link to="./" style={{ textDecoration: "none" }}>
          <div className="brand-title link fs-4" style={{ color: "#F79586" }}>
            <i
              className="fas fa-shopping-bag"
              style={{ paddingRight: "0.5rem" }}
            ></i>
            PeachCart
          </div>
        </Link>
      </div>
      <ul className="list-non-bullet nav-pills">
        <li className="display-inline">
          <Link to="./cart">
            <i className="fa-2x fas fa-shopping-cart link"></i>
          </Link>
        </li>
        <Link to="./wishlist">
          <li className="display-inline">
            <i className="fa-2x fas fa-heart link"></i>
          </li>
        </Link>
        {login ? (
          <Link to="./user">
            <li className="display-inline">
              <i className="fa-2x fas fa-user link"></i>
            </li>
          </Link>
        ) : (
          <Link to="./signup">
            <li className="display-inline">
              <i className="fa-2x fas fa-user link"></i>
            </li>
          </Link>
        )}
        <li
          onClick={() => setToggleSideBar((prev) => !prev)}
          className="display-inline"
        >
          <i
            className="fa-2x fas fa-bars ham-icon"
            style={{ paddingRight: "0rem" }}
          ></i>
        </li>
      </ul>
    </nav>
  );
};
