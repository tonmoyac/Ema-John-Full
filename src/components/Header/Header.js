import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import {CartContext, UserContext} from '../../App';
import { Link } from 'react-router-dom';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [cartItem, setCartItem] = useContext(CartContext);
    return (
        <div>
            <div className="header">
                <img className="logo" src={logo} alt="Logo"/>
                <nav>
                    <Link to="/shop">Shop</Link>
                    <Link to="/review">Order Review</Link>
                    <Link to="/inventory">Inventory</Link>
                    <button onClick={() => setLoggedInUser({})}>Sign Out</button>
                </nav>
            
            </div>
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search Your Item"/>
                <Link href="/review">
                <FontAwesomeIcon icon={faShoppingCart} className="icon"/>
                <span className="cart-count">{cartItem.length}</span>
                </Link>
            </div>
        </div>
    );
};

export default Header;