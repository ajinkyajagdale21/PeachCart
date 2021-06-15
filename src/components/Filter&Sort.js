import React from 'react';

export const FilterAndSort=()=>{
    return(
        <div className="filter-and-sort">
           <div>
               <p>CLEAR FILTERS</p>
           </div>
           <label className="labels">
                <input type="radio" name="sort"  /> Price :- LOW TO HIGH
           </label>
           <label className="labels">
               <input type="radio" name="sort"/> Price :- HIGH TO LOW
           </label>
           <label className="labels">
               <input type="checkbox" /> Include Out Of Stock
           </label>
           <label className="labels">
               <input type="checkbox" /> FAST DELIVERY ONLY
           </label>
           <h4>RATINGS</h4>
           <label className="labels">
               <input type="checkbox" /> 4 and ABOVE
           </label>
           <label className="labels">
               <input type="checkbox" /> 3 and ABOVE
           </label>
           <label className="labels">
               <input type="checkbox" /> 2 and ABOVE
           </label>
           <h4>PRICES</h4>
           <label className="labels">
               <input type="checkbox" /> 700 and ABOVE
           </label>
           <label className="labels">
               <input type="checkbox" /> 600 and ABOVE
           </label>
           <label className="labels">
               <input type="checkbox" /> 500 and ABOVE
           </label>
           <label className="labels">
               <input type="checkbox" /> 400 and ABOVE
           </label>
        </div>
    )
}