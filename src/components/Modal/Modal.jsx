import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  // при монтировании компонента вешаем слушатель событий
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  // при клике на ескейп вызываем функцию тоглмодал из галереи и закрываем модалку
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  // проверяем клик именно набекдроп вызываем функцию тоглмодал из галереи и закрываем модалку
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
