export const DataReducer=(state,action)=>{
 
    switch(action.type){
        case "DATA": return {...state,data:action.payload}; 
        case "ADD_TO_CART" :return {...state,cart:[...state.cart,{...action.payload,qty:1}]};
        case "ADD_TO_WISHLIST": return{...state,wishlist:[...state.wishlist,action.payload]}
        case "INC_QTY": return{...state,cart:state.cart.map((item)=>item.id===action.payload?{...item,qty:item.qty+1}:item)};
        case "DEC_QTY": return {...state,cart:state.cart.map((item)=>item.id===action.payload?{...item,qty:item.qty-1}:item)};
        case "REMOVE_FROM_CART": return{...state,cart:state.cart.filter((item)=>item.id!==action.payload)}
        default:
             return {state}
    }

}