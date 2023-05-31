import React, { useState } from 'react';
import './Quote.css'; // Asegúrate de crear este archivo y agregar estilos

function Quote() {
  const [isExport, setIsExport] = useState(true);

  return (
    <div className="quote">
      <h1>Nueva Cotización</h1>
      <label className="switch">
        <input type="checkbox" checked={isExport} onChange={() => setIsExport(!isExport)} />
        <span className="slider round">
          <span className="label">Exportación</span>
          <span className="label">Importación</span>
        </span>
      </label>
      <p>{isExport ? 'Exportación' : 'Importación'}</p>
      <form className="quote__form">
        <label htmlFor="product">Producto</label>
        <input id="product" type="text" />

        <label htmlFor="tariff">Fracción Arancelaria</label>
        <p id="tariff">(esto lo genera la página)</p>

        <label htmlFor="origin">Origen</label>
        <input id="origin" type="text" />

        <label htmlFor="destination">Destino</label>
        <input id="destination" type="text" />

        <label htmlFor="exchangeRate">Tipo de Cambio Americano</label>
        <p id="exchangeRate">(el cambio lo genera la página)</p>

        <button type="submit">Enviar Cotización</button>
      </form>
    </div>
  );
}

export default Quote;
