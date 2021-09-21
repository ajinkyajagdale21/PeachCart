import axios from "axios";
import { createContext, useContext,useEffect,useReducer, useState } from "react";
import {DataReducer} from './datareducer';

export const DataContext = createContext();

const initialState={
    data:[],
    cart:[],
    wishlist:[],
    sortBy:null,
    includeOutOfStock:false,
    fastDelivery:false,
    isRated:null,
    rating:0,
    isPriced:null,
    price:0
}
  
  const sortData=(data,sortBy)=>{
    if(sortBy && sortBy === 'HIGH_TO_LOW') {
        return data.sort((a,b) => b['price'] - a['price'])
    }
    if(sortBy && sortBy === 'LOW_TO_HIGH') {
        return data.sort((a,b) => a['price'] - b['price'])
    }
    return data;
  }
  const filterData = (data , {includeOutOfStock , fastDeliveryOnly}) => {
    return data.filter(({fastDelivery}) => fastDeliveryOnly ? fastDelivery : true).filter(({inStock}) => includeOutOfStock ? true : inStock)
  }
  const rateData=(data,isRated,rating)=>{
    if(isRated){
        return data.filter(item=>item.ratings>=rating)
        }
        return data;
    }
   const priceFilter=(data,isPriced,price)=>{
       if(isPriced){
           return data.filter(item=>item.price>=price)
       }
       return data;
   }
    export const DataProvider=({children})=>{
    
    const [state, dispatch] = useReducer(DataReducer, initialState)
    const [loader,setLoader]=useState(false);
    const sortedData=sortData(state.data,state.sortBy)
    const filteredData=filterData(sortedData,{includeOutOfStock:state.includeOutOfStock,fastDeliveryOnly:state.fastDelivery})
    const ratedData=rateData(filteredData,state.isRated,state.rating)
    const pricedFilter= priceFilter(ratedData,state.isPriced,state.price)
    useEffect(() => {
        
        (async function() {
            try{
                setLoader(true);
                const {data:{products}}= await axios.get(`https://afternoon-escarpment-40154.herokuapp.com/products`)
               setLoader(false);
               dispatch({type:"DATA",payload:products})
            }
            catch{
                console.log("error");
            }   
        })()
        }, [])

    return(
        <DataContext.Provider value={{state,dispatch,loader,pricedFilter}}>
            {children}
        </DataContext.Provider>
    )}


export const useData=()=>{
    return useContext(DataContext);
}