import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Report.css'

const serverURL = process.env.REACT_APP_serverURL;


const Report = () => {
    const [report, setReport] = useState({
        folio: '',
        fechaCreacion: '',
        productos: '',
        fraccionArancelaria: '',
        origenSecundario: '',
        destinoSecundario: '',
        incoterm: '',
        costoTransporte: '',
        costoFleteSecundario: '',
        origenPrincipal: '',
        costoADExportacion: '',
        arancelExportacion: '',
        costoMontacargas: '',
        costoCarga1: '',
        costoDescarga: '',
        costoCarga2: '',
        costoFletePrimario: '',
        costoSeguro: '',
        costoDescargaImportacion: '',
        costoFleteSecundarioImportacion: '',
        destinoPrimario: '',
        costoNominaDescarga: '',
        arancelImportacion: '',
        costoADImportacion: '',
        costoDCImportacion: '',
        porcentajeIgiIge: '',
        costoIGIIGE: '',
        porcentajeDTA: '',
        costoDTA: '',
        cuotaCompensatoria: '',
        porcentajeIEPS: '',
        costoIEPS: '',
        porcentajeISAN: '',
        costoISAN: '',
        porcentajeIVA: '',
        costoIVA: '',
        costoPREV: '',
        totalCostos: '',
        cambioDolar: ''
    });
    const [errors, setErrors] = useState({});

    const params = useParams();

    const userId = useSelector(state => state.user.user.userId);
    const reportId = params.reportId; //params.reportId

    const getReport = async () => {

        if(userId !== params.userId){
            setErrors({...errors, loading: "Acceso denegado"});
            return;
        }

        try {
          // Obtiene los folios de los reportes del usuario
          const responseReport = await axios.get(`${serverURL}/api/report/${reportId}`); //agregar autenticacion de usuario
          // Guardar los reportes en el estado del componente
          setReport(responseReport.data);
          setErrors({...errors, loading:null})
          
        } catch (error) {
          console.error("Error obteniendo el reporte:", error);
          setErrors({...errors, loading: "Error obteniendo el reporte, intente más tarde"});
        }
    };

    useEffect(() => {
        getReport();
    }, []);

    return (
        <div className="main report-container">
          {errors.loading ? (
            <p style={{ color: 'red', margin: '2vh' }}>{errors.loading}</p>
          ) : null}
          <h1>Reporte de cotización {report.folio}</h1>
          <p>Fecha: {report.fechaCreacion}</p>
          <p>
            Exportación de {report.producto} -{' '}
            {report.fraccionArancelaria}
          </p>
          <p>
            Desde {report.origenSecundario} a {report.destinoSecundario}
          </p>
          <p>{report.incoterm}</p>
      
          <h3>Costos de transporte</h3>
          <h5>Total: ${report.costoTransporte}</h5>
          <p>
            Flete secundario <span className="right-align">${report.costoFleteSecundario}</span>
          </p>
          <p>
            {report.origenPrincipal} a {report.origenSecundario}
          </p>
          <p>AD de Exportación <span className="right-align">${report.costoADExportacion}</span></p>
          <p>Arancel de Exportacion <span className="right-align">${report.arancelExportacion}</span></p>
          <p>Montacargas <span className="right-align">${report.costoMontacargas}</span></p>
          <p>Carga <span className="right-align">${report.costoCarga1}</span></p>
          <p>Descarga <span className="right-align">${report.costoDescarga}</span></p>
          <p>Carga <span className="right-align">${report.costoCarga2}</span></p>
          <p>Flete primario <span className="right-align">${report.costoFletePrimario}</span></p>
          <p>
            {report.origenSecundario} a {report.destinoSecundario}
          </p>
          <p>Seguro <span className="right-align">${report.costoSeguro}</span></p>
          <p>Descarga Importación <span className="right-align">${report.costoDescargaImportacion}</span></p>
          <p>
            Flete secundario de Importación{' '}
            <span className="right-align">${report.costoFleteSecundarioImportacion}</span>
          </p>
          <p>
            {report.destinoSecundario} a {report.destinoPrimario}
          </p>
          <p>Nomina de descarga <span className="right-align">${report.costoNominaDescarga}</span></p>
          <p>Arancel Importación <span className="right-align">${report.arancelImportacion}</span></p>
          <p>AD de Importación <span className="right-align">${report.costoADImportacion}</span></p>
          <p>DC de Importación <span className="right-align">${report.costoDCImportacion}</span></p>
      
          <h3>Costos de impuestos</h3>
          <p>
            IGI o IGE <span className="percentage">{report.porcentajeIgiIge}%</span>{' '}
            <span className="right-align">${report.costoIGIIGE}</span>
          </p>
          <p>
            DTA <span className="percentage">{report.porcentajeDTA}%</span>{' '}
            <span className="right-align">${report.costoDTA}</span>
          </p>
          <p>Cuota Compensatoria <span className="right-align">${report.cuotaCompensatoria}</span></p>
          <p>
            IEPS <span className="percentage">{report.porcentajeIEPS}%</span>{' '}
            <span className="right-align">${report.costoIEPS}</span>
          </p>
          <p>
            ISAN <span className="percentage">{report.porcentajeISAN}%</span>{' '}
            <span className="right-align">${report.costoISAN}</span>
          </p>
          <p>
            IVA <span className="percentage">{report.porcentajeIVA}%</span>{' '}
            <span className="right-align">${report.costoIVA}</span>
          </p>
          <p>PREV <span className="right-align">${report.costoPREV}</span></p>
          <h5>Total de costos <span className="right-align">${report.totalCostos}</span></h5>
      
          <p>
            Precios expresados en dólares al tipo de cambio americano $
            {report.cambioDolar} por dólar.
          </p>
      
          <button onClick={() => {/* código para descargar reporte */}}>Descargar reporte</button>
        </div>
    );
      
}

export default Report;
