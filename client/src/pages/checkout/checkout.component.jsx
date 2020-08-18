import React from 'react';
import {connect} from 'react-redux';
import {selectCartItems, selectCartItemsTotalPrice} from '../../redux/cart/cart.selector';
import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import { toggleCartHidden } from '../../redux/cart/cart.action';
const CheckoutPage = ({cartItems, totalPrice}) => {
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map(cartItem => 
                <CheckoutItem
                    key={cartItem.id} 
                    cartItem={cartItem}
                />
            )}
            <div className="total">
                <span>Total: ${totalPrice}</span>
            </div>
            <div className="test-warning">
                *Please use the following test credit card for payment*
                <br/>
                4242 4242 4242 4242 - Exp: 01/21 - cvc: 123
            </div>
            <StripeCheckoutButton price={totalPrice}/>
        </div>
    );
}

const mapStateToProps = state => ({
    cartItems: selectCartItems(state),
    totalPrice: selectCartItemsTotalPrice(state)
})

export default connect(mapStateToProps)(CheckoutPage);