import React from 'react';
import { useData } from '../dataContext';

export const Cart=()=>{
    const {state,dispatch} = useData();
    
    return(
        <div>
            {state.cart.length===0?<h1>Cart is empty</h1>: state.cart.map((product)=>
                <div className="product-card" key={product.id}>
            <div className="thumbnail" >
                <img className="product-card-img" src={product.image} alt="product"/>
            </div>
            <p>{product.productName}</p>
            <p>$ {product.price} </p>
            <p>{product.ratings}<i className="fas fa-star"></i></p>
            <button className="danger button" onClick={()=>dispatch({type:"DEC_QTY",payload:product.id})}>-</button>
            {product.qty}
            <button className="success button" onClick={()=>dispatch({type:"INC_QTY",payload:product.id})}>+</button>
            <button className="danger button" onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:product.id})}>Remove from Cart</button>
            <button className="success button" onClick={()=>dispatch({type:"MOVE_TO_WISHLIST",payload:product})}>MOVE TO WISHLIST</button>
        </div>
            )}
        </div>
    )
}