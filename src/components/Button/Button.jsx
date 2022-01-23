import React from 'react';

const Button = ({ onClick }) => {
  return (
    <button className="Button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
