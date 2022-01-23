import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div>
      <TailSpin heigth="60" width="60" color="skyblue" ariaLabel="loading" />
      Loading...
    </div>
  );
};

export default Loader;
