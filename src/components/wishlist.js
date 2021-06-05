import React from 'react';
import { useData } from '../dataContext';

export const WishList=()=>{
    const {state,dispatch}=useData();
    return(
        <>
            {state.wishlist.map((product)=>
            <div className="product-card" key={product.id}>
            <div className="thumbnail" >
                <img className="product-card-img" src={product.image} alt="product"/>
            </div>
            <p>{product.productName}</p>
            <p>$ {product.price} </p>
            <p>{product.rating}</p>
            <button className="danger button" onClick={()=>dispatch({type:"REMOVE_FROM_WISHLIST",payload:product.id})}>REMOVE FROM WISHLIST</button>
            <button className="success button" onClick={()=>{dispatch({type:"MOVE_TO_CART",payload:product})}}>MOVE TO CART</button>
        </div>)}
        </>
    )
}