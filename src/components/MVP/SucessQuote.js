import React from 'react';
import PropTypes from 'prop-types';

import logo from '../images/logo.png'
import workingonit from '../images/icons-mvp/workingonit.svg'

import './SuccessQuote.css'


const SuccessQuote = () => {

  return (
    <div className="success-page">
      <a href="/">
      </a>
      <div className="message-section">
        <h1>Deja todo en nuestras manos.
        <br/>Recibirás una confirmación pronto.</h1>
        <img src={workingonit} alt="Success" />
      </div>
      <a href="/dashboard"><p>Ir al Home</p></a>
    </div>
  );
};


export default SuccessQuote;
