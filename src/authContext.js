import { createContext,useReducer,useContext} from "react";
import {setupAuthHeaderForServiceCalls} from "./util";
import {authReducer} from './authReducer';

export const AuthContext=createContext();

const initialState={
    name: JSON.parse(localStorage.getItem("userDetails"))?.name||'',
    token:JSON.parse(localStorage.getItem("userDetails"))?.token||null,
    login: JSON.parse(localStorage.getItem("userDetails"))?.login||false,
    userId: JSON.parse(localStorage.getItem("userDetails"))?.userId||null,
}

export const AuthProvider=({children})=>{
 const [state,authDispatch]= useReducer(authReducer,initialState)
 if (initialState.token) {
    setupAuthHeaderForServiceCalls(initialState.token);
  }
 return(
     <AuthContext.Provider value={{state,authDispatch}}>
     {children}
     </AuthContext.Provider>
 )
}
export const useAuth=()=>{
    return useContext(AuthContext);
}