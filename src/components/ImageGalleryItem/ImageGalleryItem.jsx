import React from 'react';

const ImageGalleryItem = ({ imageURL }) => (
  <li className="gallery-item">
    <img src={imageURL} alt="" />
  </li>
);

export default ImageGalleryItem;
