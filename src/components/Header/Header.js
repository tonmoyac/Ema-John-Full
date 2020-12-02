import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <div>
            <div className="header">
                <img className="logo" src={logo} alt="Logo"/>
                <nav>
                    <a href="/shop">Shop</a>
                    <a href="/review">Order Review</a>
                    <a href="/inventory">Inventory</a>
                </nav>
            
            </div>
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search Your Item"/>
                <a href="/review">
                <FontAwesomeIcon icon={faShoppingCart} className="icon"/>
                <span className="cart-count">0
                </span>
                </a>
            </div>
        </div>
    );
};

export default Header;