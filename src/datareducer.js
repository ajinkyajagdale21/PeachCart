export const DataReducer=(state,action)=>{
 
    switch(action.type){
        case "DATA": return {...state,data:action.payload}; 
        case "ADD_TO_CART" :return {...state,cart:[...state.cart,action.payload]};
        default:
             return {state}
    }

}