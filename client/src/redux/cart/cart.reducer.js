import {CartActionTypes} from './cart.types';
import {addToCartItems, removeCartItem} from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addToCartItems(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeCartItem(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ALL_CART_ITEMS:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}

export default cartReducer;