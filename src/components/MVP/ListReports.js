import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './ListReports.css'

const serverURL = process.env.REACT_APP_serverURL;


function ReportList({ auth }) {
    const [reports, setReports] = useState([]);
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
          setReports(responseReports.data);
          setErrors({...errors, loading:null})
          
        } catch (error) {
          console.error("Error obteniendo los reportes:", error);
          setErrors({...errors, loading: "Error obteniendo los reportes, intente más tarde"});
        }
      };

    /*const getReportFolios = async () => {
        try {
          // Datos de reporte simulados
          const reportsData = [
            { folio: "123", fecha: "2023-01-01", producto: { nombre: "Producto 1", fraccionArancelaria: "001" }, origenPrincipal: "Ciudad A", destinoPrincipal: "Ciudad B", Incoterm: "EXW" },
            { folio: "456", fecha: "2023-02-01", producto: { nombre: "Producto 2", fraccionArancelaria: "002" }, origenPrincipal: "Ciudad C", destinoPrincipal: "Ciudad D", Incoterm: "FOB" },
            { folio: "789", fecha: "2023-03-01", producto: { nombre: "Producto 3", fraccionArancelaria: "003" }, origenPrincipal: "Ciudad E", destinoPrincipal: "Ciudad F", Incoterm: "CIF" },
            { folio: "012", fecha: "2023-04-01", producto: { nombre: "Producto 4", fraccionArancelaria: "004" }, origenPrincipal: "Ciudad G", destinoPrincipal: "Ciudad H", Incoterm: "DDP" },
            { folio: "345", fecha: "2023-05-01", producto: { nombre: "Producto 5", fraccionArancelaria: "005" }, origenPrincipal: "Ciudad I", destinoPrincipal: "Ciudad J", Incoterm: "FCA" },
            { folio: "678", fecha: "2023-06-01", producto: { nombre: "Producto 6", fraccionArancelaria: "006" }, origenPrincipal: "Ciudad K", destinoPrincipal: "Ciudad L", Incoterm: "DAT" }
          ];
          
          // Guardar los reportes en el estado del componente
          setReports(reportsData);
        } catch (error) {
          console.error("Error obteniendo los reportes:", error);
        }
      };*/

    useEffect(() => {
        getReportFolios();
      },[]);
    

  return (
    <div className='main'>
      <h1>Cotizaciones</h1>
      {errors.loading ? <p style={{color:'red', margin:'2vh'}}>{errors.loading}</p> : null}
      {reports.map((report, i) => (
        <div key={i} className='reportCard'>
          <h4>Reporte de cotizacion {report.folio}</h4>
          <br/>
          <p>{report.fecha}</p>
          <p>Exportacion de {report.producto} - {report.fraccionArancelaria}</p>
          <p>{report.origenPrimario} a {report.destinoPrimario}</p>
          <p>{report.Incoterm}</p>
          <a href={`/dashboard/report/${report._id}/${userId}`}>Ver reporte completo</a>
  
        </div>
      ))}
    </div>
  );
}

export default ReportList;
