import React, {useEffect} from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import {isUserAuthenticatedAsync} from './redux/user/user.action';
import {connect} from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';
import Checkoutpage from './pages/checkout/checkout.component';

const App = (props) => {

  useEffect(() => {
    props.isUserAuthenticatedAsync();
  }, [props.isUserAuthenticatedAsync]);

  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={Checkoutpage} />
        <Route exact path="/signin" render={
          () => props.currentUser ? 
            (
              <Redirect to= '/' />
            ) : (
              <SignInAndSignUpPage/>
            )
          } 
        />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  isUserAuthenticatedAsync: () => dispatch(isUserAuthenticatedAsync())
});

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
