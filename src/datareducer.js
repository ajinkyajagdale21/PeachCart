export const DataReducer=(state,action)=>{
 
    switch(action.type){
        case "DATA": return {...state,data:action.payload}; 
        case "LOAD_CART": return {...state,cart:action.payload};
        case "LOAD_WISHLIST": return {...state,wishlist:action.payload};
        case "ADD_TO_CART" :return {...state,cart:[...state.cart,{...action.payload,quantity:1}]};
        case "ADD_TO_WISHLIST": return{...state,wishlist:[...state.wishlist,action.payload]}
        case "INC_QTY": return{...state,cart:state.cart.map((item)=>item._id===action.payload?{...item,quantity:item.quantity+1}:item)};
        case "DEC_QTY": return {...state,cart:state.cart.map((item)=>item._id===action.payload?{...item,quantity:item.quantity-1}:item).filter((item)=>item.quantity!==0)};
        case "REMOVE_FROM_CART": return{...state,cart:state.cart.filter((item)=>item._id!==action.payload)}
        case "REMOVE_FROM_WISHLIST": return{...state,wishlist:state.wishlist.filter((item)=>item._id!==action.payload)}
        case "MOVE_TO_WISHLIST": return{...state,wishlist:[...state.wishlist,action.payload],cart:state.cart.filter((item)=>item._id!==action.payload._id)}
        case "MOVE_TO_CART": return{...state,cart:[...state.cart,action.payload],wishlist:state.wishlist.filter((item)=>item._id!==action.payload._id)}
        case "SORT": return{...state,sortBy: action.payload};
        case "TOGGLE_INVENTORY":return {...state,includeOutOfStock:!state.includeOutOfStock};
        case "TOGGLE_DELIVERY":return {...state,fastDelivery:!state.fastDelivery};
        case "RATED_DATA": return{...state,isRated:action.payload,rating:action.payload}
        case "PRICE_FILTER": return{...state,isPriced:action.payload,price:action.payload}
        case "CLEAR_FILTERS":return {...state, sortBy:null,
            includeOutOfStock:false,
            fastDelivery:false,
            isRated:null,
            rating:0,
            isPriced:null,
            price:0,}
        default:
             return {state}
           
     }

}
