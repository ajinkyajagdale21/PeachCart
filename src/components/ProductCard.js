import React from 'react';
import { useData } from '../dataContext';
import {Link} from 'react-router-dom';


export const ProductCard=({product})=>{
  
    const {state,dispatch}=useData();
    const addToCartClicked=()=>{
        dispatch({type: "ADD_TO_CART",payload:product})
        
    }
    const addToWishlistClicked=()=>{
        dispatch({type: "ADD_TO_WISHLIST",payload:product})
        
    }
    const isCartEmpty=(ProdId)=>{
       const foundProduct= state.cart.find(product=>product.id===ProdId)
      return foundProduct?true:false;  
      }   
      const isWishListEmpty=(ProdId)=>{
        const foundProduct= state.wishlist.find(product=>product.id===ProdId)
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
           {isCartEmpty(product._id)?<Link to ="/cart"><button className="primary button">Go To Cart</button></Link>:<button className="primary button" onClick={addToCartClicked}>Add to cart</button>}
            {isWishListEmpty(product._id)?<Link to ="/wishlist"><button className="primary button">Go To WishList</button></Link>:<button className="primary button" onClick={addToWishlistClicked}>Add to wishlist</button>}
            <button className="primary button"><Link to={`/product/${product._id}`}> View Details </Link></button>
        </div>
    )
}