import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img,price, seller, stock, key} = props.product;
    return (
        <div>
            <div className="item">
                <div className="item-img">
                    <img src={img} alt=""/>
                </div>
                <div className="productInfo">
                    <h4 className="item-header">
                        <Link to={"/product/"+ key}>{name}</Link>
                    </h4>
                    <div className="item-description">
                        <p><small>by:</small>{seller}</p>
                        <p className="price">${price}</p>
                        <p><small>only {stock} left in stock -order soon</small></p>
                        </div>
                        {props.showAddToCart && <button 
                        className='main-button'
                        onClick={() => props.handleAddProduct(props.product)}
                        ><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>}
                    
                </div>
            </div>
        </div>
    );
};

export default Product;