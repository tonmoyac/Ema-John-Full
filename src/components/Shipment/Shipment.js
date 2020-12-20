import React, { useContext } from 'react';
import './Shipment.css'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../utilities/databaseManager';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors} = useForm();
    const onSubmit = data => {
        const savedCart = getDatabaseCart()
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()}


        fetch('https://salty-forest-87391.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })    
        .then(res => res.json())
        .then(data => {
            if(data){
                processOrder();
                alert('Your Order Placed successFully')
            }
        })
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="shipment">
            <h2>Shipment Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
                {/* Name */}
                <p>Name</p>
                <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                {errors.name && <span className="error">Name is required</span>}

                {/* Email address */}
                <p>Email Address</p>
                <input name="email" defaultValue={loggedInUser.email}  ref={register({ required: true })} placeholder="Your Email" />
                {errors.email && <span className="error">Email is required</span>}

                {/* Address */}
                <p>Address</p>
                <input name="address" ref={register({ required: true })} placeholder="Your Address" />
                {errors.address && <span className="error">Address is required</span>}

                {/* Phone Number */}
                <p>Phone Number</p>
                <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
                {errors.phone && <span className="error">Phone Number is required</span>}

                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipment;