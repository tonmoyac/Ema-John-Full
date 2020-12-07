import React, { createContext } from 'react';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
export const CartContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cartItem, setCartItem] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <CartContext.Provider value={[cartItem, setCartItem]}>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/review">
            <Review />
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory /> 
          </PrivateRoute>
          <Route path="/login">
            <Login /> 
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment /> 
          </PrivateRoute>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/product/:productKey">
              <ProductDetail />
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
