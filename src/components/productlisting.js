import React from 'react'
import { useData } from '../dataContext'

export const ProductListing=()=>{
    const {state,dispatch} =useData();
    return(
        <div className="card-container">

        {state.data.map((product)=>
        <div className="product-card" key={product.id}>
            <div className="thumbnail" >
                <img className="product-card-img" src={product.image} alt="product"/>
            </div>
            <p>{product.productName}</p>
            <p>$ {product.price} </p>
            <p>{product.rating}</p>
            <button className="primary button" onClick={()=>dispatch({type: "ADD_TO_CART",payload:product})}>Add to cart</button>
            <button className="primary button">Add to wishlist</button>
        </div>
        )}
        
        </div>
    )
}