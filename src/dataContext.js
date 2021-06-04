import axios from "axios";
import { createContext, useContext,useEffect } from "react";

export const DataContext = createContext();


export const DataProvider=({children})=>{
    useEffect(async() => {
        const response= await axios.get('/api/products')
        console.log(response);
    }, [])
    return(
        <DataContext.Provider value={{}}>
            {children}
        </DataContext.Provider>
    )}


export const useData=()=>{
    return useContext(DataContext);
}