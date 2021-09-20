import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'

export const ProductDetails=  ()=>{
    const {productId}= useParams();
    const [details,setDetails] = useState(null);

        useEffect(()=>{
            try{
                (async()=>{
                const {data:{product}}= await axios.get(`https://afternoon-escarpment-40154.herokuapp.com/products/${productId}`)
                setDetails(product)
                })();    
            }
            catch(error){
                console.log(error);
            }
        })
    return(
        <div className="product-card-top">
            { !details && <h1>Loading....</h1>} 
            {details && 
            <div className="product-card">
            <div className="thumbnail" >
                <img className="product-card-img" src={details.image} alt="product"/>
            </div>
            <p>{details.productName}</p>
            <p>$ {details.price} </p>
            <p>{details.ratings} <i className="fas fa-star"></i></p>
            <p>{details.description}</p>
            <p>{details.gender}</p>
            <p>{details.offers}</p>
        </div>
            }
        </div>
        
   )
}