import './App.css';
import { Toaster } from 'react-hot-toast';
import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    searchImage: '',
  };

  // при сабмите формы записываем в стейт искомое значение
  handleFormSubmit = searchImage => {
    this.setState({ searchImage });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchImage={this.state.searchImage} />
        <Toaster />
      </>
    );
  }
}

export default App;

// API key: 24369719-4937f00e9b76df3c43c2e5aa7
