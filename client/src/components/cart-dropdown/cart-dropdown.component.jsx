import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selector';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {toggleCartHidden} from '../../redux/cart/cart.action';

import './cart-dropdown.styles.scss';

function CartDropdown({cartItems, history, dispatch}) {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.length ? 
                    (cartItems.map(
                        cartItem => 
                        (
                            <CartItem
                                key={cartItem.id}
                                item={cartItem}
                            />                                
                        )
                    )) :
                    <span
                        className="empty-message"
                    >
                        Your cart is empty
                    </span> 
                }
            </div>
            <CustomButton 
                onClick={() => {
                    history.push('/checkout');
                    dispatch(toggleCartHidden());   
                }}
            >GO TO CHECKOUT</CustomButton>        
        </div>
        );
}

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

export default withRouter(connect(mapStateToProps)(CartDropdown));