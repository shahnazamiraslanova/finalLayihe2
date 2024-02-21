import React, { useState, useEffect } from 'react';
import 'typeface-roboto';
import { NavLink } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ users }) => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('isLogin');
    if (isUserLoggedIn === 'true') {
      // User is already logged in, redirect to their page or handle accordingly
      // You can add your logic here
    }
  }, []);

  const userLogin = () => {
    let found = false;
    users.forEach(item => {
      if (item.username === usernameLogin && item.password === passwordLogin) {
        found = true;
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(item)); // Store the entire user object
        setUsernameLogin(""); // Clear the username input
        setPasswordLogin(""); // Clear the password input
        return alert("Welcome again!");
      }
    });
    if (!found) {
      alert("Wrong username or password!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userLogin();
  };

  return (
    <div id='sign'>
      <div className="container">
        <div id='signArticle'>
          <h2>WELCOME!</h2>
          <p>Sign in to take course!</p>
        </div>
        <div id='signForm'>
          <h3>Log In!</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} />
            <input type="password" placeholder='Password' value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
            <button type="submit">Log In</button>
            <p>You don't have an account? <NavLink to="signup">Sign Up</NavLink> </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
