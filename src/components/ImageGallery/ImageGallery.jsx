import React, { Component } from 'react';
import toast from 'react-hot-toast';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    gallery: [],
    loading: false,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    const prevSearchImage = prevProps.searchImage;
    const nextSearchImage = this.props.searchImage;

    if (prevSearchImage !== nextSearchImage) {
      this.setState({ loading: true, gallery: [] });
      fetch(
        `https://pixabay.com/api/?q=${nextSearchImage}&page=1&key=24369719-4937f00e9b76df3c43c2e5aa7&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        // из полученного массива забираем картинки и распыляем в стейт
        .then(gallery => this.setState({ gallery: [...gallery.hits] }))
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { gallery, error, status } = this.state;

    // if (status === 'idle') {
    //   return <div>Введите свой запрос</div>;
    // }

    // if (status === 'pending') {
    //   return <div>Loading...</div>;
    // }

    // if (status === 'rejected') {
    //   return toast.error('Woops...');
    // }

    // if (status === 'resolved') {
    //   return (
    //     <ul className="gallery">
    //       {gallery.length
    //         ? gallery.map(image => (
    //             <ImageGalleryItem
    //               key={image.id}
    //               imageURL={image.webformatURL}
    //             />
    //           ))
    //         : null}
    //     </ul>
    //   );
    // }
    return (
      // если полученный массив не пустой, перебираем его исоздаем по картинке на каждой итерации
      <>
        {error ? toast.error('Woops...') : null}
        <ul className="gallery">
          {gallery.length
            ? gallery.map(image => (
                <ImageGalleryItem
                  key={image.id}
                  imageURL={image.webformatURL}
                />
              ))
            : null}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
