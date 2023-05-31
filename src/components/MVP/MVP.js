import React from 'react';
import './MVP.css'; // import your CSS file

function MVP() {
  return (
    <div class="page">
      <div id="welcome">Hola, {}</div>
        <div id="notifications">Tienes {} notificaciones</div>

        <div class="dashboard">
            <div>En transito</div>
            <div>Proximos</div>
            <div>Productos</div>
            <div class="double-width">Mapa</div>
            <div>Balance</div>
            <div class="full-width full-height">Calendario</div> 
        </div>
    </div>
  );
}

export default MVP;
