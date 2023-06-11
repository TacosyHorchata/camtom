import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './ListProducts.css'

const serverURL = process.env.REACT_APP_serverURL;

function ListProducts() {
    const [reports, setReports] = useState(null);
    const [errors, setErrors] = useState({});

    const params = useParams();
    
    const userId = useSelector(state => state.user.user.userId);

    const getReportFolios = async () => {
      if(userId !== params.userId){
        setErrors({...errors, loading: "Acceso denegado"});
        return;
      }
        try {
          // Obtiene los folios de los reportes del usuario
          const responseFolios = await axios.get(`${serverURL}/api/reportfolios/${userId}`);
          const arrayfolios = responseFolios.data;
          console.log(arrayfolios);
          // Para cada folio, obtener el reporte completo
          const responseReports = await axios.post(`${serverURL}/api/reportfolios/`, {arrayfolios:arrayfolios});
          console.log(responseReports);
          // Guardar los reportes en el estado del componente
          if(responseReports.data.message === 'No existen cotizaciones previas'){
            setReports([]);
          }else{
            setReports(responseReports.data);
          }
          setErrors({...errors, loading:null})
          
        } catch (error) {
          console.error("Error obteniendo los reportes:", error);
          setErrors({...errors, loading: "Error obteniendo los reportes, intente más tarde"});
        }
    };

    useEffect(() => {
        getReportFolios();
      }, []);
    
    if (!reports) return <div>Cargando...</div>;
    
  return (
    <div className='main'>
    <h1>Productos</h1>
    {errors.loading ? <p style={{color:'red', margin:'2vh'}}>{errors.loading}</p> : null}
    {reports.length === 0 ? (
          <div>No hay productos disponibles</div> // display this when there are no reports
        ) : (
      reports.map((report, i) => (
        <div key={i} className="productCard">
          <h5>{report.fraccionArancelaria} - {report.producto}</h5>
          {/*<button className="detailsButton">
            <a href={`/product/{auth.userId}/{product.id}`}>{'>'}</a>
            </button>*/}
        </div>
      ))
    )}
    </div>
  );
}

export default ListProducts;