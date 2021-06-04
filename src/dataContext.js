import axios from "axios";
import { createContext, useContext,useEffect,useReducer, useState } from "react";
import {DataReducer} from './datareducer';

export const DataContext = createContext();

const initialState={
    data:[],
    cart:[],
    wishlist:[],
}

export const DataProvider=({children})=>{
    const [loader,setLoader]=useState(false);
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

        const [state, dispatch] = useReducer(DataReducer, initialState)
    return(
        <DataContext.Provider value={{state,dispatch,loader}}>
            {children}
        </DataContext.Provider>
    )}


export const useData=()=>{
    return useContext(DataContext);
}