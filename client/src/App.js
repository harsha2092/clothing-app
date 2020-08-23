import React, {useEffect, lazy, Suspense} from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header/header.component';
import {isUserAuthenticatedAsync} from './redux/user/user.action';
import {connect} from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';
import Spinner, {} from './components/spinner/spinner.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const Checkoutpage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'));

const App = (props) => {

  useEffect(() => {
    props.isUserAuthenticatedAsync();
  }, [props.isUserAuthenticatedAsync]);

  return (
    <div>
      <Header/>
      <Switch>
        <Suspense fallback={<Spinner/>}>
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
        </Suspense>
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
