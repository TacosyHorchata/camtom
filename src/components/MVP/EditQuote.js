import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './EditQuote.css'

const EditQuote = () => {
  const [cotizacion, setCotizacion] = useState(null);
  const [errors, setErrors] = useState([]);

  const params = useParams();
  const serverURL = process.env.REACT_APP_serverURL;
  const reportId = params.reportId;

  const getReport = async () => {

    try {
      // Obtiene los folios de los reportes del usuario
      const responseReport = await axios.get(`${serverURL}/api/report/${reportId}`); //agregar autenticacion de usuario
      // Guardar los reportes en el estado del componente
      setCotizacion(responseReport.data);
      
      setErrors({...errors, loading:null})
    } catch (error) {
      console.error("Error obteniendo el reporte:", error);
      setErrors({...errors, loading: "Error obteniendo el reporte, intente más tarde"});
    }
};

  useEffect(() => {
    getReport();
  }, []);

  const handleInputChange = (e, field, index, subIndex, concIndex) => {
    const { value } = e.target;
    let newCotizacion = JSON.parse(JSON.stringify(cotizacion)); // Una forma de hacer una copia profunda
  
    if(field === "seccion") {
      newCotizacion.secciones[index].titulo = value;
    } else if(field === "subtitulo") {
      newCotizacion.secciones[index].subtitulos[subIndex].nombre = value;
    } else if(field === "concepto") {
        console.log(newCotizacion);
      newCotizacion.secciones[index].subtitulos[subIndex].conceptos[concIndex].concepto = value;
    } else if(field === "valor") {
      newCotizacion.secciones[index].subtitulos[subIndex].conceptos[concIndex].valor = value;
    } else {
      newCotizacion[field] = value;
    }
  
    setCotizacion(newCotizacion);
  };
  


  const handleAddSection = () => {
    setCotizacion({
      ...cotizacion,
      secciones: [
        ...cotizacion.secciones,
        { titulo: '', subtitulos: [] },
      ],
    });
  };

  const handleRemoveSection = (index) => {
    setCotizacion({
      ...cotizacion,
      secciones: cotizacion.secciones.filter((_, i) => i !== index),
    });
  };

  const handleAddSubtitulo = (index) => {
    const newSecciones = [...cotizacion.secciones];
    newSecciones[index].subtitulos.push({ nombre: '', conceptos: [] });
    setCotizacion({ ...cotizacion, secciones: newSecciones });
  };

  const handleRemoveSubtitulo = (index, subIndex) => {
    const newSecciones = [...cotizacion.secciones];
    newSecciones[index].subtitulos = newSecciones[index].subtitulos.filter((_, i) => i !== subIndex);
    setCotizacion({ ...cotizacion, secciones: newSecciones });
  };

  const handleAddConcepto = (index, subIndex) => {
    const newSecciones = [...cotizacion.secciones];
    newSecciones[index].subtitulos[subIndex].conceptos.push({ concepto: '', valor: '0' });
    setCotizacion({ ...cotizacion, secciones: newSecciones });
  };

  const handleRemoveConcepto = (index, subIndex, concIndex) => {
    const newSecciones = [...cotizacion.secciones];
    newSecciones[index].subtitulos[subIndex].conceptos = newSecciones[index].subtitulos[subIndex].conceptos.filter((_, i) => i !== concIndex);
    setCotizacion({ ...cotizacion, secciones: newSecciones });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cotizacion);
    try{
    // Esta es una función de axios que supuestamente actualiza la cotizacion
    await axios.put(`${serverURL}/api/report/${reportId}/edit`, cotizacion);
    alert('Reporte actualizado con exito')
    }catch(error) {
        console.error("Error actualizando el reporte:", error);
        alert('Error actualizando el reporte, intente más tarde')
        setErrors({...errors, loading: "Error actualizando el reporte, intente más tarde"});
    }
};

  if (!cotizacion) return <div>Loading...</div>;

  return (
    
    <form onSubmit={handleSubmit}>
        <p>Report ID: {reportId}</p>
        <div className="form-section">
            <div className="form-row">
                <label htmlFor="folio">User ID:</label>
                <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={cotizacion.userId}
                    disabled
                />
            </div>


            <div className="form-row">
            <label htmlFor="folio">Folio:</label>
            <input
                type="text"
                id="folio"
                name="folio"
                value={cotizacion.folio}
                onChange={(e) => handleInputChange(e, 'folio')}
            />
            </div>

            <div className="form-row">
                <label htmlFor="fechaCreacion">Fecha de Creación:</label>
                <input
                    type="text"
                    id="fechaCreacion"
                    name="fechaCreacion"
                    value={cotizacion.fechaCreacion}
                    onChange={(e) => handleInputChange(e, 'fechaCreacion')}
                />
            </div>

            <div className="form-row">
                <label htmlFor="producto">Producto:</label>
                <input
                    type="text"
                    id="producto"
                    name="producto"
                    value={cotizacion.producto}
                    onChange={(e) => handleInputChange(e, 'producto')}
                />
            </div>

            <div className="form-row">
            <label htmlFor="fraccionArancelaria">Fracción Arancelaria:</label>
            <input
                type="text"
                id="fraccionArancelaria"
                name="fraccionArancelaria"
                value={cotizacion.fraccionArancelaria}
                onChange={(e) => handleInputChange(e, 'fraccionArancelaria')}
            />
            </div>

            <div className="form-row">
            <label htmlFor="origenPrimario">Origen Primario:</label>
            <input
                type="text"
                id="origenPrimario"
                name="origenPrimario"
                value={cotizacion.origenPrimario}
                onChange={(e) => handleInputChange(e, 'origenPrimario')}
            />
            </div>

            <div className="form-row">
            <label htmlFor="destinoPrimario">Destino Primario:</label>
            <input
                type="text"
                id="destinoPrimario"
                name="destinoPrimario"
                value={cotizacion.destinoPrimario}
                onChange={(e) => handleInputChange(e, 'destinoPrimario')}
            />
            </div>

            <div className="form-row">
            <label htmlFor="origenSecundario">Origen Secundario:</label>
            <input
                type="text"
                id="origenSecundario"
                name="origenSecundario"
                value={cotizacion.origenSecundario}
                onChange={(e) => handleInputChange(e, 'origenSecundario')}
            />
            </div>

            <div className="form-row">
            <label htmlFor="destinoSecundario">Destino Secundario:</label>
            <input
                type="text"
                id="destinoSecundario"
                name="destinoSecundario"
                value={cotizacion.destinoSecundario}
                onChange={(e) => handleInputChange(e, 'destinoSecundario')}
            />
            </div>

            <div className="form-row">
            <label htmlFor="incoterm">Incoterm:</label>
            <input
                type="text"
                id="incoterm"
                name="incoterm"
                value={cotizacion.incoterm}
                onChange={(e) => handleInputChange(e, 'incoterm')}
            />
            </div>

            <div className="form-row">
            <label htmlFor="costoMercancia">Costo Mercancia:</label>
            <input
                type="text"
                id="costoMercancia"
                name="costoMercancia"
                value={cotizacion.costoMercancia}
                onChange={(e) => handleInputChange(e, 'costoMercancia')}
            />
            </div>
        </div>

        {cotizacion.secciones.map((seccion, index) => (
            <div className="form-section" key={index}>
            <div className="form-title">
                <label htmlFor={`titulo${index}`}>Título de Sección:</label>
                <input
                type="text"
                id={`titulo${index}`}
                value={seccion.titulo}
                onChange={(e) => handleInputChange(e, 'seccion', index)}
                />
            </div>

            <div className="form-actions">
                <button type="button" onClick={() => handleRemoveSection(index)}>
                Eliminar Sección
                </button>
                <button type="button" onClick={() => handleAddSubtitulo(index)}>
                Agregar Subtítulo
                </button>
            </div>

            {seccion.subtitulos.map((subtitulo, subIndex) => (
                <div className="form-subsection" key={subIndex}>
                <div className="form-subtitle">
                    <label htmlFor={`subtitulo${index}-${subIndex}`}>Nombre de Subtítulo:</label>
                    <input
                    type="text"
                    id={`subtitulo${index}-${subIndex}`}
                    value={subtitulo.nombre}
                    onChange={(e) => handleInputChange(e, 'subtitulo', index, subIndex)}
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => handleRemoveSubtitulo(index, subIndex)}>
                    Eliminar Subtítulo
                    </button>
                    <button type="button" onClick={() => handleAddConcepto(index, subIndex)}>
                    Agregar Concepto
                    </button>
                </div>

                {subtitulo.conceptos.map((concepto, concIndex) => (
                    <div className="form-concept" key={concIndex}>
                    <button type="button" onClick={() => handleRemoveConcepto(index, subIndex, concIndex)}>
                        Eliminar Concepto
                    </button>

                    <label>
                        Concepto:
                        <input
                        type="text"
                        value={concepto.concepto}
                        onChange={(e) => handleInputChange(e, 'concepto', index, subIndex, concIndex)}
                        />
                    </label>

                    <label>
                        Valor:
                        <input
                        type="text"
                        value={concepto.valor}
                        onChange={(e) => handleInputChange(e, 'valor', index, subIndex, concIndex)}
                        />
                    </label>
                    </div>
                ))}
                </div>
            ))}
            </div>
        ))}

        <div className="form-actions">
            <button type="button" onClick={handleAddSection}>
            Agregar Sección
            </button>
        </div>

        <div className="form-section">
            <div className="form-row">
            <label htmlFor="totalCostos">Total de Costos:</label>
            <input
                type="text"
                id="totalCostos"
                name="totalCostos"
                value={cotizacion.totalCostos}
                onChange={(e) => handleInputChange(e, 'totalCostos')}
            />
            </div>

            <div className="form-row">
            <label htmlFor="cambioDolar">Cambio de Dólar:</label>
            <input
                type="text"
                id="cambioDolar"
                name="cambioDolar"
                value={cotizacion.cambioDolar}
                onChange={(e) => handleInputChange(e, 'cambioDolar')}
            />
            </div>

            {/*<div className="form-row">
                <label htmlFor="accepted">Accepted:</label>
                <input
                    type="checkbox"
                    id="accepted"
                    name="accepted"
                    checked={cotizacion.accepted}
                    onChange={(e) => handleInputChange(e, 'accepted')}
                />
                </div>*/}
        </div>

        <div className="form-actions">
            <button type="submit">Guardar</button>
        </div>
    </form>

  );
};

export default EditQuote;
