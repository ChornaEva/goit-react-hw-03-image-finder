import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import axios from "axios";

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
      return toast.error('Enter text.');
    }

    this.props.onSubmit(this.state.searchImage);
    this.setState({ searchImage: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleNameChange}
            className="input"
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
