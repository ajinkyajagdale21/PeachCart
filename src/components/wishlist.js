import React from 'react';
import { useData } from '../dataContext';

export const WishList=()=>{
    const {state}=useData();
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
           
        </div>)}
        </>
    )
}