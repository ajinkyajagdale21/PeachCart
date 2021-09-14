import React from 'react';
import { useParams } from 'react-router';
import { useData } from '../dataContext';


export const ProductDetails=()=>{
    const {productId}= useParams();
    const {state}=useData();

    const getProductDetails=(products,productId)=>{
        return products.find((product)=>product._id===productId)
     }
    const product= getProductDetails(state.data,productId)
    return(
        <div className="product-card-top">
            <div className="product-card">
            <div className="thumbnail" >
                <img className="product-card-img" src={product.image} alt="product"/>
            </div>
            <p>{product.productName}</p>
            <p>$ {product.price} </p>
            <p>{product.ratings} <i className="fas fa-star"></i></p>
            <p>{product.description}</p>
            <p>{product.gender}</p>
            <p>{product.offers}</p>
        </div>
        </div>
    )
}