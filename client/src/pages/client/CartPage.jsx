import React, { useEffect, useState } from 'react';
import './Cart.css'; // Import your CSS file for styling
import { NavLink } from 'react-router-dom';
import {  IoIosTrash } from 'react-icons/io';
import StripeCheckout from 'react-stripe-checkout';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userLoggedIn = loggedInUser && localStorage.getItem('isLogin') === 'true';
    
    if (userLoggedIn && loggedInUser.cart) {
      const cartArray = Object.entries(loggedInUser.cart).map(([id, cartItem]) => ({ id, ...cartItem }));
      setCart(cartArray);
    } else {
      setCart([]);
    }
    
    setIsLoggedIn(userLoggedIn);
  }, []); // Empty dependency array to run the effect only once

  const removeFromCart = (id) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const updatedCart = { ...loggedInUser.cart };
    delete updatedCart[id];
    loggedInUser.cart = updatedCart;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    const updatedCartArray = Object.entries(updatedCart).map(([id, cartItem]) => ({ id, ...cartItem }));
    setCart(updatedCartArray);
  };

  const updateCartItem = (id, count) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const updatedCart = { ...loggedInUser.cart };
    updatedCart[id].count = count;
    loggedInUser.cart = updatedCart;
    
    // Update user in the backend (assuming the user can be updated via API)
    fetch(`http://localhost:8080/users/${loggedInUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loggedInUser),
    })
      .then(res => res.json())
      .then(data => {
        // Update logged in user in local storage
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        const updatedCartArray = Object.entries(data.cart).map(([id, cartItem]) => ({ id, ...cartItem }));
        setCart(updatedCartArray);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const incrementCount = (id) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(item => item.id === id);
    updatedCart[index].count += 1;
    setCart(updatedCart);
    updateCartItem(id, updatedCart[index].count);
  };

  const decrementCount = (id) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(item => item.id === id);
    if (updatedCart[index].count > 1) {
      updatedCart[index].count -= 1;
      setCart(updatedCart);
      updateCartItem(id, updatedCart[index].count);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.count), 0);
  };

  const handleToken = (token) => {
    console.log(token); // You can process the payment token here
    // You can send the payment token to your server for further processing, such as charging the user
  };

  if (!isLoggedIn) {
    return (
      <div>
        <div className='cartTit'>
          <h1>CART</h1>
        </div>
        <div className="container">
          <h1 className="cart-title">Cart</h1>
          <p className="no-cart-message">You are not logged in. Please log in from the Home page.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='cartTit'>
        <h1>CART</h1>
      </div>
      <div className="container">
        <h1 className="cart-title">Cart</h1>
        {cart.length > 0 ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(cartItem => (
                  <tr key={cartItem.id}>
                    <td>{cartItem.title}</td>
                    <td>${cartItem.price}</td>
                    <td id='cartCountBtns'>
                      <button onClick={() => decrementCount(cartItem.id)}>-</button>
                      {cartItem.count}
                      <button onClick={() => incrementCount(cartItem.id)}>+</button>
                    </td>
                    <td><button className='remove' onClick={() => removeFromCart(cartItem.id)}><IoIosTrash /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-price">Total Price: ${getTotalPrice()}</div>
            <StripeCheckout
              stripeKey="your_stripe_public_key" // Your Stripe public key
              token={handleToken}
              amount={getTotalPrice() * 100} // Total amount in cents
              name="Your Website Name"
              billingAddress
              shippingAddress
            >
              <button className="pay-button">Pay Now</button>
            </StripeCheckout>
          </>
        ) : (
          <p className="no-cart-message">Your cart is empty. Please add some items!</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
