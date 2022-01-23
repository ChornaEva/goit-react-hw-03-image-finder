import React, { Component } from 'react';
import toast from 'react-hot-toast';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button';
import Modal from '../Modal';

class ImageGallery extends Component {
  state = {
    gallery: [],
    status: 'idle',
    page: 1,
    total: 0,
    largeImageURL: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchImage = prevProps.searchImage;
    const nextSearchImage = this.props.searchImage;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchImage !== nextSearchImage) {
      this.setState({ status: 'pending', gallery: [], page: 1 });

      fetch(
        `https://pixabay.com/api/?q=${nextSearchImage}&page=1&key=24369719-4937f00e9b76df3c43c2e5aa7&image_type=photo&orientation=horizontal&per_page=12`
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
        `https://pixabay.com/api/?q=${nextSearchImage}&page=${nextPage}&key=24369719-4937f00e9b76df3c43c2e5aa7&image_type=photo&orientation=horizontal&per_page=12`
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

  // открытие/закрытие модального окна
  toggleModal = (largeImageURL = '') => {
    this.setState(state => ({ showModal: !state.showModal, largeImageURL }));
  };

  render() {
    const { gallery, status, total, showModal, largeImageURL } = this.state;

    if (status === 'idle') {
      return <div>'Enter your querry'</div>;
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
          <ul className="ImageGallery">
            {gallery.length
              ? gallery.map(image => (
                  <ImageGalleryItem
                    key={image.id}
                    imageURL={image.webformatURL}
                    largeImageURL={image.largeImageURL}
                    toggleModal={this.toggleModal}
                  />
                ))
              : null}
          </ul>
          {/* если длинна масива меньше максимальной-показываем кнопку ;загрузить ещё;, нет- кнопка скрыта*/}
          {gallery.length < total ? (
            <Button
              type="button"
              state={this.state}
              onClick={this.onLoadMore}
            />
          ) : null}
          {/* если модалка закрыта,вызываем тоглмодал и открываем её */}
          {showModal && (
            <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
