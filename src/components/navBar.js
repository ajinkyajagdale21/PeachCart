import React from 'react';
import {Link} from 'react-router-dom';

export const NavBar=()=>{
    return(
        <div>
            <nav className="navigation">
	            <div className="brand">
                <Link to = "./">
                <div className="brand-title link">PeachCart</div>
                </Link>
                </div>
                <ul className="list-non-bullet nav-pills"> 
                    <li className="display-inline">
                    <Link to = "./cart">   
                        <i className="fa-2x fas fa-shopping-cart link"></i>
                    </Link>
                    </li>
                    <Link to = "./wishlist">
                    <li className="display-inline">
                        <i className="fa-2x fas fa-heart link" ></i>
                    </li>
                    </Link>
                </ul> 
            </nav>
        </div>
    )
}