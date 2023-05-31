import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import sucess_supplier from './images/success_supplier.svg'
import sucess_producer from './images/success_producer.svg'
import sucess_exporting from './images/success_exporting.svg'
import logo from './images/logo.png'

import './style/Success.css'


const Success = () => {

  const {messageType} = useParams();
  const params = useParams();
  let title, message, imageSrc;

  switch (messageType) {
    case 'supplier':
      title = "Nos encataría trabajar contigo y tu proveedor";
      message = "Tu ejecutivo personal se pondrá en contacto.";
      imageSrc = sucess_supplier; // change the path to your real image source
      break;

    case 'producer':
      title = 'No te preocupes, ¡Nosotros te ayudaremos!';
      message = "Tu ejecutivo personal se pondrá en contacto.";
      imageSrc = sucess_producer; // change the path to your real image source
      break;

    case 'exporting':
      title = '¡Hola, Bienvenid@ a la familia!';
      message = "Tu ejecutivo personal se pondrá en contacto.";
      imageSrc = sucess_exporting; // change the path to your real image source
      break;

    default:
      title = '¡Solicitud enviada con éxito!';
      message = "Tu ejecutivo personal se pondrá en contacto.";
      imageSrc = sucess_exporting; // change the path to your real image source
  }

  return (
    <div className="success-page">
      <a href="/">
        <img src={logo} alt="Logo" />
      </a>
      <div className="message-section">
        <h2>{title}</h2>
        <p><b>{message}</b></p>
        <img src={imageSrc} alt="Success" />
      </div>
      <a href="/"><p>Volver a inicio</p></a>
    </div>
  );
};

Success.propTypes = {
  messageType: PropTypes.oneOf(['supplier', 'producer', 'exporting'])
};

export default Success;
