import React,{useEffect} from 'react';
import { useAuth } from '../authContext';
import { useData } from '../dataContext';
import axios from 'axios';

export const WishList=()=>{
    const {state,dispatch}=useData();
    const {state:{userId,token}}=useAuth();
    
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
    
    async function removeFromWishlist(prodID){
        if(token){
           try{
               const {data:{success}}= await axios.delete(`https://afternoon-escarpment-40154.herokuapp.com/wishlist/${userId}/${prodID}`)
              if(success){
               dispatch({type:"REMOVE_FROM_WISHLIST",payload:prodID})               
              }
           }
           catch(error){
               console.log({message:error.message})
           }
        }
    }
    const moveToCart=async(prodID)=>{
        try{
            const product= state.wishlist.find(item=>item._id===prodID)
            await axios.delete(`https://afternoon-escarpment-40154.herokuapp.com/wishlist/${userId}/${prodID}`)
            await axios.post(`https://afternoon-escarpment-40154.herokuapp.com/cart/${userId}`,{productId:prodID})
            dispatch({type:"MOVE_TO_CART",payload:product})
         }
        catch(error){
            console.log(error)
        }
        
    }
    return(
        <div className="product-card-top">
            {state.wishlist.length===0?<h1>WishList is empty</h1>:state.wishlist.map((product)=>
            <div className="product-card" key={product._id}>
            <div className="thumbnail" >
                <img className="product-card-img" src={product.image} alt="product"/>
            </div>
            <p>{product.productName}</p>
            <p>$ {product.price} </p>
            <p>{product.ratings}<i className="fas fa-star"></i></p>
            <button className="danger button" onClick={()=>removeFromWishlist(product._id)}>REMOVE FROM WISHLIST</button>
            <button className="success button" onClick={()=>{moveToCart(product._id)}}>MOVE TO CART</button>
        </div>)}
        </div>
    )
}

