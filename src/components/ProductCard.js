import React,{useState} from 'react';
import { useData } from '../dataContext';
import {Link} from 'react-router-dom';

export const ProductCard=({...product})=>{
    const {dispatch}=useData();
    const [AddToCartbtnClicked,setAddToCartbtnClicked]=useState(false)
    const [AddToWishlistbtnClicked,setAddTowishlistbtnClicked]=useState(false)
   
    const addToCartClicked=()=>{
        dispatch({type: "ADD_TO_CART",payload:product})
        setAddToCartbtnClicked(true)
    }
    const addToWishlistClicked=()=>{
        dispatch({type: "ADD_TO_WISHLIST",payload:product})
        setAddTowishlistbtnClicked(true);
    }
    
    return(
        <div className="product-card" key={product.id}>
            <div className="thumbnail" >
                <img className="product-card-img" src={product.image} alt="product"/>
            </div>
            <p>{product.productName}</p>
            <p>$ {product.price} </p>
            <p>{product.ratings}<i className="fas fa-star"></i></p>
           {AddToCartbtnClicked?<Link to ="/cart"><button className="primary button">Go To Cart</button></Link>:<button className="primary button" onClick={addToCartClicked}>Add to cart</button>}
            {AddToWishlistbtnClicked?<Link to ="/wishlist"><button className="primary button">Go To WishList</button></Link>:<button className="primary button" onClick={addToWishlistClicked}>Add to wishlist</button>}
            <button className="primary button"><Link to={`/product/${product.id}`}> View Details </Link></button>
        </div>
    )
}