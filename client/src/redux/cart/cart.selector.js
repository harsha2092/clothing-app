import { createSelector } from 'reselect';
import { createStore } from 'redux';
import CartItem from '../../components/cart-item/cart-item.component';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems   
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce( 
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity
        , 0) 
);

export const selectCartItemsTotalPrice = createSelector(
    [selectCartItems],
    (cartItems) => 
        cartItems.reduce(
            (accumulatedQuantity, cartItem) => 
                accumulatedQuantity + cartItem.quantity * cartItem.price
            , 0
        )
);

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);