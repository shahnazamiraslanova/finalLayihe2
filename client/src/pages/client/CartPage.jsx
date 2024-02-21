import React, { useEffect, useState } from 'react';
import './Cart.css'; // Import your CSS file for styling
import { IoIosTrash } from 'react-icons/io';
import StripeCheckout from 'react-stripe-checkout';

const CartPage = () => {
  const timestamp = new Date().toLocaleString();
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const incrementCount = (id) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(item => item.id === id);
    updatedCart[index].count += 1;
    setCart(updatedCart);
  };

  const decrementCount = (id) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(item => item.id === id);
    if (updatedCart[index].count > 1) {
      updatedCart[index].count -= 1;
      setCart(updatedCart);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.count), 0);
  };

  const handleToken = (token) => {
    console.log(token); // You can process the payment token here
    // Extracting name from the token
    const { name } = token;
    // Getting the current timestamp
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userName = loggedInUser.name; // Get user name from localStorage
    const totalPrice = getTotalPrice(); // Get total price
    const paymentData = {
      userName: userName,
      name: name,
      totalPrice: totalPrice,
      courseId: cart[0].id // Assuming the cart contains only one item (course)
    };
    setPaymentInfo(paymentData); // Set payment information to state
    setShowModal(true); // Show modal after payment
  };

  const closeModal = () => {
    setShowModal(false);
    setPaymentInfo(null); // Clear payment info after closing modal
  };

  const totalPages = Math.ceil(cart.length / itemsPerPage); // Calculate total number of pages

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cart.slice(indexOfFirstItem, indexOfLastItem);

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
        {currentItems.length > 0 ? (
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
                {currentItems.map(cartItem => (
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
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : null}>{i + 1}</button>
              ))}
            </div>
            <div className="total-price">Total Price: ${getTotalPrice()}</div>
            <StripeCheckout
              stripeKey="pk_test_51Olzd5E5njb4LJtHVxS1P1YXH4ZpmbpUr1NZK7QnJtjLzaCdxZ8xpGufbOYZinSy0D306tscK8IK0EGM2a84vpGE00dPatSrog"
              token={handleToken}
              amount={getTotalPrice() * 100} // Total amount in cents
              name="Magic Academy"
              billingAddress
              shippingAddress
              allowRememberMe // Enable remember me option
              // Collect user's name
              shippingAddressOptions={{ name: 'user name' }}
            >
              <button className="pay-button">Pay Now</button>
            </StripeCheckout>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <h2>Payment Information</h2>
                  <p><strong>Username:</strong> {paymentInfo.userName}</p>
                  <p><strong>Name:</strong> {paymentInfo.name}</p>
                  <p><strong>Course Name:</strong> {cart[0].title}</p>
                  <p><strong>Total Price:</strong> ${paymentInfo.totalPrice}</p>
                  <p><strong>Timestamp:</strong> {timestamp}</p>
                  <p><strong>Note:</strong> Please print or screen this page.</p>
                  <div className="paid-stamp">PAID</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="no-cart-message">Your cart is empty. Please add some items!</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
