import React from 'react';
import { useData } from '../dataContext';
import {Link,useNavigate} from 'react-router-dom';
import { useAuth } from '../authContext';
import axios from 'axios';


export const ProductCard=({product})=>{
  
    const {state,dispatch}=useData();
    const {state:{token,userId}}= useAuth();
    const navigate= useNavigate();
    const addToCartClicked=async(prodID)=>{
        if(token){
            try{
               const {data:{product}} = await axios.post(`https://afternoon-escarpment-40154.herokuapp.com/cart/${userId}`,{productId:prodID})
               dispatch({type: "ADD_TO_CART",payload:product})
            }
            catch(error){
                console.log(error);
            }
        }
    }
    const addToWishlistClicked=async(prodID)=>{
        if(token){
            try{
                const {data:{product}} = await axios.post(`https://afternoon-escarpment-40154.herokuapp.com/wishlist/${userId}`,{productId:prodID}) 
                dispatch({type: "ADD_TO_WISHLIST",payload:product})
                }
            catch(error){
                console.log(error)
            }
        }
     }
    const isCartEmpty=(ProdId)=>{
       const foundProduct= state.cart.find(product=>product._id===ProdId)
      return foundProduct?true:false;  
      }   
      const isWishListEmpty=(ProdId)=>{
        const foundProduct= state.wishlist.find(product=>product._id===ProdId)
       return foundProduct?true:false;  
       }  
    return(
        <div className="product-card" key={product._id}>
            <div className="thumbnail" >
                <img className="product-card-img" src={product.image} alt="product"/>
            </div>
            <p>{product.productName}</p>
            <p>$ {product.price} </p>
            <p>{product.ratings}<i className="fas fa-star"></i></p>
           {isCartEmpty(product._id)?<Link to ="/cart"><button className="primary button">Go To Cart</button></Link>:<button className="primary button" onClick={()=>token?addToCartClicked(product._id):navigate('/login')}>Add to cart</button>}
            {isWishListEmpty(product._id)?<Link to ="/wishlist"><button className="primary button">Go To WishList</button></Link>:<button className="primary button" onClick={()=>token?addToWishlistClicked(product._id):navigate('/login')}>Add to wishlist</button>}
            <button className="primary button"><Link to={`/product/${product._id}`}> View Details </Link></button>
        </div>
    )
}