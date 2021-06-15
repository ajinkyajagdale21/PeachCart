import React from 'react'
import { useData } from '../dataContext'
import {ProductCard} from './ProductCard'
import { FilterAndSort } from './Filter&Sort'

export const ProductListing=()=>{
    const {state,loader} =useData();
    
    return(
        <div >
          <div className="product-layout">
            <FilterAndSort/>
            <div className="product-card-top">
              {loader?<h1>Loading....</h1>:state.data.map((product)=>
                <ProductCard {...product} key={product.id} />
              )}
            </div>
         </div>
        </div>
    )
}