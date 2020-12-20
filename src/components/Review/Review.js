import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { getDatabaseCart, removeFromDatabaseCart } from '../utilities/databaseManager';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    // const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://salty-forest-87391.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

        // const cartProducts= productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     product.quantity =savedCart[key];
        //     return product;
        // });
        // setCart(cartProducts);
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
                    <button className='order-button' onClick={handleProceedCheckout}>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;