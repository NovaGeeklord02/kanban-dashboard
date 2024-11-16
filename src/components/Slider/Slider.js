import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = ({ children, itemsPerPage: defaultItemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [totalItems, setTotalItems] = useState(React.Children.count(children));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let columnsPerPage;
      if (width >= 1440) {
        columnsPerPage = 5;
      } else if (width >= 1024) {
        columnsPerPage = 4;
      } else if (width >= 768) {
        columnsPerPage = 3;
      } else if (width >= 480) {
        columnsPerPage = 2;
      } else {
        columnsPerPage = 1;
      }
      setItemsPerPage(columnsPerPage);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setTotalItems(React.Children.count(children));
    setCurrentPage(0);
  }, [children]);

  const needsSlider = totalItems > itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const slideLeft = () => {
    setCurrentPage(prev => 
      prev > 0 ? prev - 1 : totalPages - 1
    );
  };

  const slideRight = () => {
    setCurrentPage(prev => 
      prev < totalPages - 1 ? prev + 1 : 0
    );
  };

  const getCurrentItems = () => {
    if (!needsSlider) {
      return children;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return React.Children.toArray(children).slice(startIndex, endIndex);
  };

  return (
    <div className="slider">
      <div className="slider-container">
        {needsSlider && (
          <button className="slide-btn prev-btn" onClick={slideLeft}>
            <i className="fa fa-arrow-left">←</i>
          </button>
        )}

        <div className="slider-content">
          {getCurrentItems()}
        </div>

        {needsSlider && (
          <button className="slide-btn next-btn" onClick={slideRight}>
            <i className="fa fa-arrow-right">→</i>
          </button>
        )}
      </div>

      {needsSlider && (
        <div className="pagination-dots">
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={`dot ${currentPage === index ? 'active' : ''}`}
              onClick={() => setCurrentPage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;