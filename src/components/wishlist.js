import React,{useEffect} from 'react';
import { useAuth } from '../authContext';
import { useData } from '../dataContext';
import axios from 'axios';

export const WishList=()=>{
    const {state,dispatch}=useData();
    const {state:{userId}}=useAuth();
    
    useEffect(() => {
     (async function(){
        try{ 
            const {data:{wishlist}}= await axios.get(`https://afternoon-escarpment-40154.herokuapp.com/wishlist/${userId}`)
            dispatch({type:"LOAD_WISHLIST",payload:wishlist})
        }
        catch(error){
            console.log(error)
        } 
     })()    
        
    },[dispatch,userId])
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