import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './QuoteForm.css'

const serverURL = process.env.REACT_APP_serverURL;

function QuoteForm() {
  const [type, setType] = useState('Exportación');
  const [product, setProduct] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [hasClientOrProvider, setHasClientOrProvider] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otherOrigin, setOtherOrigin] = useState("");
  const [otherDestination, setOtherDestination] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [products, setProducts] = useState([""]);

  const navigate = useNavigate();

  const userId = useSelector(state => state.user.user.userId);

  const countries = [
    "Alemania",
    "Argentina",
    "Australia",
    "Austria",
    "Bélgica",
    "Brasil",
    "Canadá",
    "Chile",
    "China",
    "Colombia",
    "Corea del Sur",
    "Costa Rica",
    "Croacia",
    "Dinamarca",
    "Egipto",
    "Emiratos Árabes Unidos",
    "España",
    "Estados Unidos",
    "Filipinas",
    "Finlandia",
    "Francia",
    "Grecia",
    "Holanda",
    "Hungría",
    "India",
    "Indonesia",
    "Irlanda",
    "Israel",
    "Italia",
    "Japón",
    "Marruecos",
    "México",
    "Noruega",
    "Nueva Zelanda",
    "Panamá",
    "Perú",
    "Polonia",
    "Portugal",
    "Reino Unido",
    "República Checa",
    "Rusia",
    "Sudáfrica",
    "Suecia",
    "Suiza",
    "Tailandia",
    "Taiwán",
    "Turquía",
    "Ucrania",
    "Uruguay",
    "Venezuela",
    "Vietnam",
    "Otro"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si todos los campos están llenos
    if (!type || !product || !origin || !destination || (origin === "Otro" && !otherOrigin) || (destination === "Otro" && !otherDestination)) {
      setErrorMessage('Por favor, rellena todos los campos.');
      return;
    };
    // Verifica si se aceptaron los terminos y condiciones
    if (!acceptedTerms) {
      setErrorMessage('Debes aceptar los términos y condiciones.');
      return;
    };
  // Verifica qyue todos los productos esten completados
    if (products.some(product => product === "")) {
      setErrorMessage('Por favor, rellena todos los productos.');
      return;
    };

    const quote = {
      userId: userId, 
      importacionExportacion: type,
      nombreProducto: product,
      origen: origin === "Otro" ? otherOrigin : origin,
      destino: destination === "Otro" ? otherDestination : destination,
      cambioDolar: exchangeRate,
      tieneClienteOProveedor: hasClientOrProvider,
    };
    

    console.log(quote)

    try {
      const quoteRes = await axios.post(`${serverURL}/api/quotes`, quote);
      const quoteId = quoteRes.data._id;
      await axios.put(`${serverURL}/api/quote/${userId}`, {quoteId: quoteId});

      // Navega a la página principal después de un envío exitoso
      alert("Cotización creada con éxito")
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setErrorMessage('Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
  };

  const toggleButton = () => {
    setIsOn(!isOn);
    setType(isOn ? 'Exportación' : 'Importación');
  };

   // Función para manejar el cambio en el nombre o la tarifa de un producto
   const handleProductChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index] = value;
    setProducts(newProducts);
  };

  // Función para agregar un nuevo producto al array de productos
  const addProduct = () => {
    setProducts([...products, ""]);
  };

  return (
    <div className="quote-form-container">
      <h1 className="form-title">Cotización</h1>
      
      <form onSubmit={handleSubmit} className="quote-form">
        <div className={`toggle-button ${isOn ? 'on' : ''}`} onClick={toggleButton}>
          <div className="toggle-indicator">
            <div className="toggle-text">{isOn ? 'Importación' : 'Exportación'}</div>
          </div>
          <div className="toggle-label">{'Exportación   Importación'}</div>
        </div>

        <div className={` input-block `}>
          <p className="label-contactform">País de Origen</p>
          <select 
          name="origen"
          className="select-contactform form-select"
          onChange={e => setOrigin(e.target.value)}
          >
            <option value="" selected>Seleccione</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          {origin === "Otro" && <input className="form-input" type="text" placeholder="Ingresa el país" onChange={e => setOtherOrigin(e.target.value)} />}
        </div>

        <div className={`input-block`}>
          <p className="label-contactform">{type === 'Exportación' ? '¿Ya tienes cliente?' : '¿Ya tienes proveedor?'}</p>
          <label className="checkbox-container">
            <p className='text-center' style={{margin:'0vh'}}>Sí</p>
            <input
              type="checkbox"
              name="hasClientOrProvider"
              value="Sí"
              checked={hasClientOrProvider === 'Sí'}
              onChange={e => setHasClientOrProvider(e.target.value)}
            />
            <span className="checkmark"></span>
          </label>

          <label className="checkbox-container">
            <p className='text-center' style={{margin:'0vh'}}>No</p>
            <input
              type="checkbox"
              name="hasClientOrProvider"
              value="No"
              checked={hasClientOrProvider === 'No'}
              onChange={e => setHasClientOrProvider(e.target.value)}
            />
            <span className="checkmark"></span>
          </label>
        </div>

        <div className={` input-block `}>
          <p className="label-contactform">País de Destino</p>
          <select 
          name="destino"
          className="select-contactform form-select"
          onChange={e => setDestination(e.target.value)}
          >
            <option value="" selected>Seleccione</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          {destination === "Otro" && <input className="form-input" type="text" placeholder="Ingresa el país" onChange={e => setOtherDestination(e.target.value)} />}
        </div>

        <div className={` input-block `}>
          {products.map((product, index) => (
            <div key={index}>
              <label className="form-label">
                Producto {index + 1}
                <input
                  className="form-input"
                  type="text"
                  value={product}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}

          <button type="button" onClick={addProduct}>
            Agregar producto
          </button>
        </div>

        <div className={`input-block`}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              name="acceptedTerms"
              value={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
              style={{ marginRight: '10px' }}  // Espacio entre el checkbox y el texto
            />
            <p style={{margin:0}}>He leído y acepto <a href="/terms-conditions">los términos y condiciones</a></p>
          </label>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="submit-button" type="submit">Crear Cotización</button>
      </form>
    </div>
  );  
}

export default QuoteForm;
