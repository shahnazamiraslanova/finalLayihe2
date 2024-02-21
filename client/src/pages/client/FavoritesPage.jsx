import React, { useEffect, useState } from 'react';
import './FavoritesPage.css'; // Import your CSS file for styling
import { IoIosTrash, IoIosCart } from 'react-icons/io';

const FavoritesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userLoggedIn = loggedInUser && localStorage.getItem('isLogin') === 'true';

    if (userLoggedIn && loggedInUser.favs) {
      const favoritesArray = Object.entries(loggedInUser.favs).map(([id, favorite]) => ({ id, ...favorite }));
      setFavorites(favoritesArray);
    } else {
      setFavorites([]);
    }

    setIsLoggedIn(userLoggedIn);
  }, []); // Empty dependency array to run the effect only once

  // Logic to get current favorites for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFavorites = favorites.slice(indexOfFirstItem, indexOfLastItem);

  // Logic to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(favorite => favorite.id !== id);
    setFavorites(updatedFavorites);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    loggedInUser.favs = updatedFavorites.reduce((acc, favorite) => {
      acc[favorite.id] = favorite;
      return acc;
    }, {});
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  };

  const addToCart = (favorite) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const updatedCart = { ...(loggedInUser.cart || {}) };
    updatedCart[favorite.id] = { ...favorite, count: 1 };
    loggedInUser.cart = updatedCart;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  };

  if (!isLoggedIn) {
    return (
      <div>
        <div className='favsTit'>
          <h1>FAVORITES</h1>
        </div>
        <div className="container">
          <h1 className="favorites-title">Favorites</h1>
          <p className="no-favorites-message">You did not Log in. Please log in from the Home page.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='favsTit'>
        <h1>FAVORITES</h1>
      </div>
      <div className="container">
        <h1 className="favorites-title">Favorites</h1>
        {currentFavorites.length > 0 ? (
          <div className="favorites-list">
            {currentFavorites.map(favorite => (
              <div key={favorite.id} className="favorite-item">
                <img src={favorite.img} alt="" />
                <h2 className="favorite-name">{favorite.title}</h2>
                <p>Price: ${favorite.price}</p>
                <div className="favorite-actions">
                  <button onClick={() => addToCart(favorite)}><IoIosCart /></button>
                  <button className="remove" onClick={() => removeFromFavorites(favorite.id)}><IoIosTrash /></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-favorites-message">You don't have any favorites yet. Please add some from the Courses page!</p>
        )}
        <div className="pagination">
          {Array.from({ length: Math.ceil(favorites.length / itemsPerPage) }, (_, i) => (
            <button key={i + 1} className={currentPage === i + 1 ? 'active' : ''} onClick={() => paginate(i + 1)}>{i + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
