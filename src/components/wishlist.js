import React from 'react';
import { useData } from '../dataContext';

export const WishList=()=>{
    const {state,dispatch}=useData();
    return(
        <div className="product-card-top">
            {state.wishlist.length===0?<h1>WishList is empty</h1>:state.wishlist.map((product)=>
            <div className="product-card" key={product.id}>
            <div className="thumbnail" >
                <img className="product-card-img" src={product.image} alt="product"/>
            </div>
            <p>{product.productName}</p>
            <p>$ {product.price} </p>
            <p>{product.ratings}<i className="fas fa-star"></i></p>
            <button className="danger button" onClick={()=>dispatch({type:"REMOVE_FROM_WISHLIST",payload:product.id})}>REMOVE FROM WISHLIST</button>
            <button className="success button" onClick={()=>{dispatch({type:"MOVE_TO_CART",payload:product})}}>MOVE TO CART</button>
        </div>)}
        </div>
    )
}