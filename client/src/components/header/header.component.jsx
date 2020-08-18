import React from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { signOutAsync } from '../../redux/user/user.action';
import './header.styles.scss';
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink,
    OptionDiv
} from './header.styles';


const Header = ({currentUser, cartHidden, signOutAsync}) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo"/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop"> Shop </OptionLink>
                <OptionLink to="/shop"> Contact </OptionLink>
                {currentUser ? 
                <OptionDiv onClick={() => signOutAsync()}> Sign out </OptionDiv>
                : 
                <OptionLink to="/signin"> Sign In </OptionLink>
                }
                <CartIcon/>
            </OptionsContainer>
            {cartHidden ? null : <CartDropdown/> }
        </HeaderContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    signOutAsync: () => dispatch(signOutAsync())
});

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
    cartHidden: selectCartHidden(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);