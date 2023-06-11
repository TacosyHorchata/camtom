import React from 'react';
import './Help.css'; 

import whatsapp_icon from '../images/icons-mvp/whatsapp.png'
import email_icon from '../images/icons-mvp/email.png'
import videocall_icon from '../images/icons-mvp/videocall.png'

const Help = () => {
  return (
    <div className="containerHelp">
      <h1>Estamos aquí para ti</h1>
      <a href="https://wa.link/0epcm6" className="button" target='blank'><img src={whatsapp_icon} alt="WhatsApp"/>WhatsApp</a>
      <a href="https://calendly.com/camtom-logistics/help" className="button" target='blank'><img src={videocall_icon} alt="Videocall"/>Agendar Videollamada</a>
      <a href="mailto:hello@camtomx.com?subject=Ayuda%20a%20clientes%20Camtom" className="button" target='blank'><img src={email_icon} alt="Email"/>Email</a>
    </div>
  );
}

export default Help;
