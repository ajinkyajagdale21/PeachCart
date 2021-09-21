import React, { useEffect } from 'react';
import { useData } from '../dataContext';
import axios from 'axios';
import { useAuth } from '../authContext';

export const Cart=()=>{
    const {state,dispatch} = useData();
    const {state:{userId,token}} = useAuth();
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
    
    const decreaseQuantity= async(prodID)=>{
        const product = state.cart.find(each => each._id === prodID)
        if(token){
        try{
            const decrement = await axios.post(`https://afternoon-escarpment-40154.herokuapp.com/cart/${userId}/${prodID}`,{quantity:product.quantity-1})
            if(decrement.data.success)
            dispatch({type:"DEC_QTY",payload:prodID})
        }
        catch(error){
            console.log(error)
        }
        
    }
    } 
    const increaseQuantity= async(prodID)=>{
        const product = state.cart.find(each => each._id === prodID)
       if(token){
           try{
            const increment = await axios.post(`https://afternoon-escarpment-40154.herokuapp.com/cart/${userId}/${prodID}`,{quantity:product.quantity+1})
            if(increment.data.success)
            dispatch({type:"INC_QTY",payload:prodID})

        }
           catch(error){
            console.log(error)
           }
       }
       
    }
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
                    <button className="danger button" onClick={()=>decreaseQuantity(product._id)}>-</button>
                    <div >{product.quantity}</div>
                    <button className="success button" onClick={()=>increaseQuantity(product._id)}>+</button>
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