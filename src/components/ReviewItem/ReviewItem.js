import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, quantity, price, key} = props.product;
    return (
        <div className="reviewItem">
            <h4 className="name">{name}</h4>
            <h5>Price: <span className="price">{price}</span>$</h5>
            <p>Quantity: {quantity}</p>
            <br/>
            <button className="reviewBtn" onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;