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
    <div>
      <nav className="flex bg-stone-800">
        <div className="">
          <Link to="./">
            <div className="">PeachCart</div>
          </Link>
        </div>
        <ul className="">
          <li className="">
            <Link to="./cart">
              <i className="fa-2x fas fa-shopping-cart link"></i>
            </Link>
          </li>
          <Link to="./wishlist">
            <li className="">
              <i className="fa-2x fas fa-heart link"></i>
            </li>
          </Link>
          {login ? (
            <Link to="./user">
              <li className="">
                <i className="fa-2x fas fa-user link"></i>
              </li>
            </Link>
          ) : (
            <Link to="./signup">
              <li className="">
                <i className="fa-2x fas fa-user link"></i>
              </li>
            </Link>
          )}
          <li onClick={() => setToggleSideBar((prev) => !prev)} className="">
            <i className="fa-2x fas fa-bars "></i>
          </li>
        </ul>
      </nav>
    </div>
  );
};
