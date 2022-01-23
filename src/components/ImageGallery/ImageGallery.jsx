import React, { Component } from 'react';
import toast from 'react-hot-toast';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button';

class ImageGallery extends Component {
  state = {
    gallery: [],
    status: 'idle',
    page: 1,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchImage = prevProps.searchImage;
    const nextSearchImage = this.props.searchImage;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchImage !== nextSearchImage) {
      this.setState({ status: 'pending', gallery: [], page: 1 });

      fetch(
        `https://pixabay.com/api/?q=${nextSearchImage}&page=1&key=24369719-4937f00e9b76df3c43c2e5aa7&image_type=photo&orientation=horizontal&per_page=100`
      )
        .then(res => res.json())
        // из полученного массива забираем картинки и распыляем в стейт
        .then(gallery =>
          this.setState({
            gallery: [...gallery.hits],
            status: 'resolved',
            total: gallery.totalHits,
          })
        )
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        )
        .finally(console.log(this.state.total));
    }
    // если пред стр не равна след-й и не первая, отправляем запрос на дозагрузку изображений
    if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextSearchImage}&page=${nextPage}&key=24369719-4937f00e9b76df3c43c2e5aa7&image_type=photo&orientation=horizontal&per_page=100`
      )
        .then(res => res.json())
        // получаем новые картинки, распыляем в галерею уже сущ-е и новые
        .then(newGallery =>
          this.setState({
            gallery: [...prevState.gallery, ...newGallery.hits],
            status: 'resolved',
            total: newGallery.totalHits,
          })
        )
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
    }
  }
  // при клике на кнопку загрузить ещё- увеличиваем стра на 1
  onLoadMore = event => {
    event.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { gallery, status, total } = this.state;

    if (status === 'idle') {
      return <div>Введите свой запрос</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return toast.error('Woops...');
    }

    if (status === 'resolved') {
      return (
        <>
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
          {gallery.length < total ? (
            <Button state={this.state} onClick={this.onLoadMore} />
          ) : null}
        </>
      );
    }
  }
}

export default ImageGallery;
