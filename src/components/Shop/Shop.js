import React, { useContext, useEffect } from 'react';
import './Shop.css'
import Footer from '../Footer/Footer';
import { useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    // const data = fakeData.slice(0,15);
    const [products, setProducts] = useState([]);
    const [cart, setCart] =useState([]);
    useEffect(() => {
        fetch('https://salty-forest-87391.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

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
    }, [])

    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
    if(sameProduct){
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        const others = cart.filter(pd => pd.key !== toBeAddedKey);
        newCart = [...others, sameProduct]
    }
    else {
        product.quantity = 1;
        newCart = [...cart, product]
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
    }
    return (
        <div>
            <div className="twin-container">
                <div className="product-container">
                <ul>
                {
                    products.map(product => <Product
                         key={product.key} 
                         product={product}
                         showAddToCart = {true}
                         handleAddProduct ={handleAddProduct}
                         />
                         )
                }
                </ul>
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                        <button className='order-button'>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        <Footer />
        </div>
    );
};

export default Shop;