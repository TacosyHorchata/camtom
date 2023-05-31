import React, { useEffect, useState } from 'react';
import {database} from '../firebase.js'
import {ref, push} from "firebase/database";
import { useNavigate } from 'react-router-dom';

import "./style.css"
import "./style/FormSinglePage.css"

import logo from './images/logo.png'

function FormSinglePage() {

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    regimen: '',
    productor: '',
    exporta: '',
    cantidadExportacion: '',
    puesto: '',
    codigoReferido: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    //Al seleccionar los checkbox el borde cambia de color
    const allInputs = document.querySelectorAll("input");
    
    allInputs.forEach(input => {
      input.addEventListener("change", e => {
        const parentElement = e.target.closest(".checkbox-container");
        const parentElements = document.querySelectorAll(".checkbox-container");
  
        parentElements.forEach(element => {
          if (element !== parentElement) {
            element.style.border = "";
          }
        });
  
        if (e.target.checked) {
          parentElement.style.border = "2px solid #004A7C";
        } else {
          parentElement.style.border = "";
        }
      });
    });
  }, []);

  const navigate = useNavigate();
  

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Verificamos si todos los campos están llenos
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      // Ignora la verificación para 'codigoReferido'
      if (key === 'codigoReferido') return;
      //valida correo
      if (formData.correo && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.correo)) {
        newErrors.correo = 'Por favor, introduce un correo electrónico válido';
      }
      // Si el usuario es productor y ya exporta, 'cantidadExportacion' es obligatorio
      if (key === 'cantidadExportacion' && formData.productor === '1' && formData.exporta === '1' && !formData[key]) {
        newErrors[key] = 'Este campo es obligatorio';
      } 
      // Si el usuario es productor, 'exporta' es obligatorio
      else if (key === 'exporta' && formData.productor === '1' && !formData[key]) {
        newErrors[key] = 'Este campo es obligatorio';
      } 
      // Para el resto de los campos (excepto 'codigoReferido', 'exporta', 'cantidadExportacion'), son obligatorios
      else if (key !== 'exporta' && key !== 'cantidadExportacion' && !formData[key]) {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      // Si hay errores, los establecemos y no enviamos el formulario
      setFormErrors(newErrors);
    } else {
      // Aqui enviamos los datos a la base de datos de Firebase
      push(ref(database, 'form/'), formData)
      .then((res) => {
        // Redireccionamos a la página de éxito
        successParam();
      })    
      .catch((err) => {
        console.error(err);
      }); 
    }
  };

  const handleAbandonarFormulario = () => {
    if (window.confirm('¿Estás seguro de que deseas abandonar el formulario?')) {
      navigate('/')
    }
  };
  //pasa el parametro al componente Success para que cargue el mensaje segun el formulario
  const successParam = () => {

    let option;

    if(formData.productor==='0'){
      option="supplier";
    } else if (formData.productor==='1' && formData.exporta==='0'){
      option="producer";
    }else if (formData.productor==='1' && formData.exporta==='1'){
      option="exporting";
    }else{
      option='';
    }

    navigate(`/success/${option}`)
  };

  return (

    <div class="container-form">

    <header className="header-form d-flex flex-wrap align-items-center justify-content-between py-2 mb-4">
      <a href="/" className="col-4 text-dark text-decoration-none">
        <img id="img-logo" src={logo} alt="Camtom logo" />
      </a>
      {Object.values(formErrors).filter(Boolean).length > 0 && (
        <div className="alert alert-danger">
          Por favor, llena todos los campos requeridos
        </div>
      )}
      <button className="btn-close" onClick={handleAbandonarFormulario}>
      </button>
    </header>

        

        <div>

        <h1 className="h1-contactform">
          Para ofrecerte una solución <br /> te haremos algunas preguntas
        </h1>

          <div className={`input-block ${formErrors.nombre ? 'has-error' : ''}`}>
            <h4 style={{color:"#004A7C", fontWeight:"normal"}} className="label-contactform">Sobre ti</h4>
            <h4 className="label-contactform">¿Cuál es tu nombre?</h4>
            <input 
              className="input-contactform"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="José Ornelas Guzmán"
            />
            {formErrors.nombre && <div className="error-message">{formErrors.nombre}</div>}
          </div>

          <div className={`input-block ${formErrors.correo ? 'has-error' : ''}`}>
            <h4 className="label-contactform">Correo electrónico de contacto</h4>
            <input 
              className="input-contactform"
              type="text"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              placeholder="pepe@tuempresa.com"
            />
            {formErrors.correo && <div className="error-message">{formErrors.correo}</div>}
          </div>

        <div className={`input-block ${formErrors.regimen ? 'has-error' : ''}`}>
          <h4 style={{color:"#004A7C", fontWeight:"normal"}} className="label-contactform">Legal</h4>
          <h4 className="label-contactform">Régimen Fiscal</h4>
          <label className="checkbox-container">
            <p className='text-center' style={{margin:'0vh'}}>Persona Física</p>
            <input
                type="checkbox"
                name="regimen"
                value="Persona Fisica"
                checked={formData.regimen === 'Persona Fisica'}
                onChange={handleInputChange}
            />
            <span className="checkmark"></span>
            </label>

            <label className="checkbox-container">
            <p className='text-center' style={{margin:'0vh'}}>Persona Moral</p>
            <input
                type="checkbox"
                name="regimen"
                value="Persona Moral"
                checked={formData.regimen === 'Persona Moral'}
                onChange={handleInputChange}
            />
            <span className="checkmark"></span>
            </label>
            {formErrors.regimen && <div className="error-message">{formErrors.regimen}</div>}
        </div>

        <div className={`input-block ${formErrors.empresa ? 'has-error' : ''}`}>
            <h4 className="label-contactform">¿Cómo se llama tu empresa?</h4>
            <input 
              className="input-contactform"
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleInputChange}
              placeholder="Piñas Ornelas SA de CV"
            />
            {formErrors.empresa && <div className="error-message">{formErrors.empresa}</div>}
          </div>

        <div className={` input-block ${formErrors.puesto ? 'has-error' : ''}`}>
          <h4 className="label-contactform">Cargo en la empresa</h4>
          <select 
          value={formData.puesto} 
          onChange={handleInputChange} 
          name="puesto"
          className="select-contactform form-select">
            <option value="" selected>Seleccione</option>
            <option value="CEO/Dueño">CEO/Dueño</option>
            <option value="Director">Director</option>
            <option value="Gerente">Gerente</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Coordinador">Coordinador</option>
            <option value="Especialista">Especialista</option>
            <option value="Analista">Analista</option>
            <option value="Practicante">Practicante</option>
            <option value="Otro">Otro</option>
          </select>
          {formErrors.puesto && <div className="error-message">{formErrors.puesto}</div>}
        </div>

        {/* Se pregunta si es productor */}
        <div className={`input-block ${formErrors.productor ? 'has-error' : ''}`}>
          <h4 style={{color:"#004A7C", fontWeight:"normal"}} className="label-contactform">Producción</h4>
          <h4 className="label-contactform">¿Eres productor de lo que comercializas?</h4>
          <label className="checkbox-container">
          <p className='text-center' style={{margin:'0vh'}}>Sí</p>
            <input
              type="checkbox"
              name="productor"
              value="1"
              checked={formData.productor === '1'}
              onChange={handleInputChange}
            />
             <span className="checkmark"></span>
          </label>
          <label className="checkbox-container">
          <p className='text-center' style={{margin:'0vh'}}>No</p>
            <input
              type="checkbox"
              name="productor"
              value="0"
              checked={formData.productor === '0'}
              onChange={handleInputChange}
            />
             <span className="checkmark"></span>
          </label>
          {formErrors.productor && <div className="error-message">{formErrors.productor}</div>}
        </div>

        {/* Se despliega este div en caso de ser productor */}
        {formData.productor === '1' && (
          <div className={`input-block ${formErrors.exporta ? 'has-error' : ''}`}>
            <h4 className="label-contactform">¿Ya exportas?</h4>
            <label className="checkbox-container">
            <p className='text-center' style={{margin:'0vh'}}>Sí</p>
              <input
                type="checkbox"
                name="exporta"
                value="1"
                checked={formData.exporta === '1'}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
            <p className='text-center' style={{margin:'0vh'}}>No</p>
              <input
                type="checkbox"
                name="exporta"
                value="0"
                checked={formData.exporta === '0'}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
            </label>
            {formErrors.exporta && <div className="error-message">{formErrors.exporta}</div>}
          </div>
        )}

        {/* Se despliega este div en caso de ya exportar */}
        {formData.exporta === '1' && formData.productor === '1' && (
          <div className={`input-block ${formErrors.cantidadExportacion ? 'has-error' : ''}`}>
                <h4 class="label-contactform">¿Qué cantidad?</h4>
                <select 
                value={formData.cantidadExportacion} 
                onChange={handleInputChange} 
                class="select-contactform form-select" 
                name="cantidadExportacion"
                >
                    <option value="" selected>Seleccione</option>
                    <option value="Ninguno">Ninguno</option>
                    <option value="1 pallet">1 pallet</option>
                    <option value="Menos de 5 Pallets">Menos de 5 Pallets</option>
                    <option value="Menos de 1 Contenedor">Menos de 1 Contenedor</option>
                    <option value="1 Contenedor">1 Contenedor</option>
                    <option value="5 o menos Contenedores">5 o menos Contenedores</option>
                    <option value="Más de 5 Contenedores">Más de 5 Contenedores</option>
                </select>
                <p className='text-center' style={{color:"#8C8C8C"}}>No importa la cantidad, nosotros ayudamos a todos.</p>
                {formErrors.cantidadExportacion && <div className="error-message">{formErrors.cantidadExportacion}</div>}
            </div>
            
        )}

        <div className='input-block'>
            <h4 className="label-contactform">Código de Referido</h4>
            <input 
              className="input-contactform"
              type="text"
              name="codigoReferido"
              value={formData.codigoReferido}
              onChange={handleInputChange}
              placeholder="pepe86"
            />

            {/* agregar verificacion si el codigo no existe*/}
          </div>

        <button className='btn btn-primary button-submit' onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
}

export default FormSinglePage;
