import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../fakeData/fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { getDatabaseCart, removeFromDatabaseCart } from '../utilities/databaseManager';

const Review = () => {
    const [cart, setCart] = useState([]);

    const handlePlaceOrder = () => {
        console.log('Placed order');
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts= productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity =savedCart[key];
            return product;
        });
        setCart(cartProducts);
    } ,[])

    return (
        <div className="twin-container">
            <div className="product-container">
            <h1>Cart Items {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem product={pd} 
                    key ={pd.key}
                    removeProduct={removeProduct}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart= {cart}>
                    <button className='order-button' onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;