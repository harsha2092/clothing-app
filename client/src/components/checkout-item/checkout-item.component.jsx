import React from 'react';
import './checkout-item.styles.scss';
import {connect} from 'react-redux';
import {clearItemFromCart, removeItem, addItem} from '../../redux/cart/cart.action';

function CheckoutItem({cartItem, clearItemFromCart, addItem, removeItem}) {
    const {imageUrl, price, name, quantity} = cartItem;
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt='item'/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div 
                    className="arrow"
                    onClick={() => removeItem(cartItem)}
                >
                        &#10094;
                </div>
                <div className="value">{quantity}</div>
                <div 
                    className="arrow"
                    onClick={() => addItem(cartItem)}
                >
                        &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div 
                className="remove-button"
                onClick={() => clearItemFromCart(cartItem)}
            >
                &#10005;
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    clearItemFromCart: cartItem => dispatch(clearItemFromCart(cartItem)),
    removeItem: cartItem => dispatch(removeItem(cartItem)),
    addItem: cartItem => dispatch(addItem(cartItem))
});

export default connect(null,mapDispatchToProps)(CheckoutItem);