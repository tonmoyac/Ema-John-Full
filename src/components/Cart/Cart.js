import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    // console.log(cart)

    let total = 0;
    let price = 0;
    for( let i = 0; i< cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
        price = product.price
    }
    let shipping = 0;
    if( total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.50
    }
    else if(total > 0){
        shipping = 8
    }
    let tax = 0;
    if(total >0){
        tax = (total/10).toFixed(2);
    }
    const grandTotal = total + shipping + Number(tax);
    
    return (
        <>
            <h3>Order Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <hr/>
            <div className="cart">
            <table>
                <tbody>
                    <tr>
                        <td>Items:</td>
                        <td>${price }</td>
                    </tr>
                    <tr>
                        <td>Shipping:</td>
                        <td>${shipping}</td>
                    </tr>
                    <tr>
                        <td>Vat + Tax:</td>
                        <td>${tax}</td>
                    </tr>
                    <tr className="total-row">
                        <td>Order Total:</td>
                        <td>${grandTotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
                {
                    props.children
                }
            </div>
        </>
    );
};

export default Cart;