import React from 'react';

const ImageGalleryItem = ({ imageURL, tags, toggleModal, largeImageURL }) => (
  <li className="ImageGalleryItem">
    <img
      src={imageURL}
      alt={tags}
      className="ImageGalleryItem-image"
      onClick={() => toggleModal(largeImageURL)}
    />
  </li>
);

export default ImageGalleryItem;
