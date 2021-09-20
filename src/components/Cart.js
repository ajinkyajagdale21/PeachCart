import React, { useEffect } from 'react';
import { useData } from '../dataContext';
import axios from 'axios';
import { useAuth } from '../authContext';

export const Cart=()=>{
    const {state,dispatch} = useData();
    const {state:{userId}} = useAuth();
    useEffect(()=>{
        (async function(){

          try{
           const {data:{cart}}= await axios.get(`https://afternoon-escarpment-40154.herokuapp.com/cart/${userId}`)
           dispatch({type:"LOAD_CART",payload:cart})
          }
          catch(error){
              console.log(error)
          }
        })()
    },[dispatch,userId])
    
    return(
        <div className="product-card-top">
            {state.cart.length===0?<h1>Cart is empty</h1>: state.cart.map((product)=>
                <div className="product-card" key={product.id}>
            <div className="thumbnail" >
                <img className="product-card-img" src={product.image} alt="product"/>
            </div>
            <p>{product.productName}</p>
            <p>$ {product.price} </p>
            <p>{product.ratings}<i className="fas fa-star"></i></p>
            <div className="button-container">
                <div className="button-side">            
                    <button className="danger button" onClick={()=>dispatch({type:"DEC_QTY",payload:product.id})}>-</button>
                    <div >{product.qty}</div>
                    <button className="success button" onClick={()=>dispatch({type:"INC_QTY",payload:product.id})}>+</button>
                </div>
                <div className="button-side">
                    <button className="danger button" onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:product.id})}>Remove from Cart</button>
                    <button className="success button" onClick={()=>dispatch({type:"MOVE_TO_WISHLIST",payload:product})}>MOVE TO WISHLIST</button>
                </div>
            </div>       
        </div>
            )}
        </div>
    )
}