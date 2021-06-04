import axios from "axios";
import { createContext, useContext,useEffect,useReducer } from "react";
import {DataReducer} from './datareducer';

export const DataContext = createContext();

const initialState={
    data:[],
    cart:[],
    wishlist:[],
}

export const DataProvider=({children})=>{
    useEffect(() => {
        
        (async function() {
            try{
                const {data:{products}}= await axios.get('/api/products')
                console.log(products);
                dispatch({type:"DATA",payload:products})
            }
            catch{
                console.log("error");
            }   
        })()
        }, [])

        const [state, dispatch] = useReducer(DataReducer, initialState)
    return(
        <DataContext.Provider value={{state,dispatch}}>
            {children}
        </DataContext.Provider>
    )}


export const useData=()=>{
    return useContext(DataContext);
}