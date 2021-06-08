import React from 'react'
import { useData } from '../dataContext'
import {ProductCard} from './ProductCard'

export const ProductListing=()=>{
    const {state,loader} =useData();
    
    return(
        <div className="card-container">

      {loader?<h1>Loading....</h1>:state.data.map((product)=>
        <ProductCard {...product} key={product.id} />
        )}
        
        </div>
    )
}