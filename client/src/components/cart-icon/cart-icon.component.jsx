import React from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.action';
import {selectCartItemsCount} from '../../redux/cart/cart.selector';

import './cart-icon.styles.scss';

const CartIcon = (props) => {
    return (
        <div className='cart-icon' onClick={props.toggleCartHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <div className='item-count'>{props.itemCount}</div>
        </div>
    );
}

const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
})
const mapDispatchToprops = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToprops)(CartIcon);