import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

class Searchbar extends Component {
  state = {
    images: [],
    searchImage: '',
  };
  // при изменении значения инпута, значение записывается в стейт
  handleNameChange = event => {
    this.setState({ searchImage: event.currentTarget.value.toLowerCase() });
  };

  // при сабмите формы вызываю метод handleFormSubmit и передаю ему значение искомого изображения
  // при нажатии на серч, значение запроса очищается
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchImage === ''.trim()) {
      return toast.error('Введите данные для запроса.');
    }

    this.props.onSubmit(this.state.searchImage);
    this.setState({ searchImage: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handleNameChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
