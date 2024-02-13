// Parallax.jsx
import React from 'react';
import './Parallax.css';

const Parallax = () => {
  return (
    <div id="parallax">
      <div className="container">
        <div id="parallaxImg">
          <img src="https://preview.colorlib.com/theme/oneschool/images/person_4.jpg" alt="" />
        </div>
        <div className="content">
          <h3>David Bunyamin</h3>
          <p>
            What sets Magic Academy apart is its emphasis on real-world application. The courses not only covered the theoretical aspects but also provided practical insights into performing magic in various settings. The skills I acquired have opened doors to incredible opportunities in the magical entertainment industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Parallax;
