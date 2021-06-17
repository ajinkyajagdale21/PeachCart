import axios from "axios";
import { createContext, useContext,useEffect,useReducer, useState } from "react";
import {DataReducer} from './datareducer';

export const DataContext = createContext();

const initialState={
    data:[],
    cart:[],
    wishlist:[],
    sortBy:null,
    includeInStock:false,
    fastDelivery:false,
    isRated:null,
    isPriced:null,
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

export const DataProvider=({children})=>{
    
    const [state, dispatch] = useReducer(DataReducer, initialState)
    const [loader,setLoader]=useState(false);
    const sortedData=sortData(state.data,state.sortBy)
    useEffect(() => {
        
        (async function() {
            try{
                setLoader(true);
                const {data:{products}}= await axios.get('/api/products')
                console.log(products);
                setLoader(false);
                dispatch({type:"DATA",payload:products})
            }
            catch{
                console.log("error");
            }   
        })()
        }, [])

    return(
        <DataContext.Provider value={{state,dispatch,loader,sortedData}}>
            {children}
        </DataContext.Provider>
    )}


export const useData=()=>{
    return useContext(DataContext);
}