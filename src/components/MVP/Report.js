import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
        cambioDolar: '',
        accepted: false,
    });
    const [errors, setErrors] = useState({});
    const [termsAccepted, setTermsAccepted] = useState(false); 

    const params = useParams();
    const navigate = useNavigate();

    const userId = useSelector(state => state.user.user.userId);
    const reportId = params.reportId; //params.reportId

    const checkAndSetValues = (reportData) => {
      Object.keys(reportData).forEach(key => {
          if(reportData[key] === '' || reportData[key] === 0){
              reportData[key] = 'Por definir';
          }
      });
      return reportData;
    }

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
          console.log(responseReport.data)
          const updatedData = checkAndSetValues(responseReport.data);
          setReport(updatedData);
          console.log(updatedData);
          console.log(report);

          setErrors({...errors, loading:null})
        } catch (error) {
          console.error("Error obteniendo el reporte:", error);
          setErrors({...errors, loading: "Error obteniendo el reporte, intente más tarde"});
        }
    };

    const acceptQuote = async () => {
        if(userId !== params.userId){
            return;
        }

        if(termsAccepted) {
            try {
                await axios.put(`${serverURL}/api/report/${reportId}/accepted`, { accepted: true });
                setReport({...report, accepted:true});
                navigate('/dashboard/success-quote');
            } catch (error) {
                console.error("Error al aceptar la cotización:", error);
                setErrors({...errors, acceptQuote: "Error al aceptar la cotización, intente más tarde."});
            }
        } else {
            setErrors({...errors, acceptQuote: "Debe aceptar los términos y condiciones antes de aceptar la cotización"});
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
    <p>Fecha: <i><u>{report.fechaCreacion}</u></i></p>
    <p>
        Exportación de <i><u>{report.producto}</u></i> -{' '}
        <i><u>{report.fraccionArancelaria}</u></i>
    </p>
    <p>
        Desde <i><u>{report.origenSecundario}</u></i> a <i><u>{report.destinoSecundario}</u></i>
    </p>
    <p><i><u>{report.incoterm}</u></i></p>

    <h3>Costos de transporte</h3>
    <h5>Total: $<i><u>{report.costoTransporte}</u></i></h5>
    <p>
        Flete secundario <span className="right-align">$<i><u>{report.costoFleteSecundario}</u></i></span>
    </p>
    <p>
        <i><u>{report.origenPrincipal}</u></i> a <i><u>{report.origenSecundario}</u></i>
    </p>
    <p>AD de Exportación <span className="right-align">$<i><u>{report.costoADExportacion}</u></i></span></p>
    <p>Arancel de Exportacion <span className="right-align">$<i><u>{report.arancelExportacion}</u></i></span></p>
    <p>Montacargas <span className="right-align">$<i><u>{report.costoMontacargas}</u></i></span></p>
    <p>Carga <span className="right-align">$<i><u>{report.costoCarga1}</u></i></span></p>
    <p>Descarga <span className="right-align">$<i><u>{report.costoDescarga}</u></i></span></p>
    <p>Carga <span className="right-align">$<i><u>{report.costoCarga2}</u></i></span></p>
    <p>Flete primario <span className="right-align">$<i><u>{report.costoFletePrimario}</u></i></span></p>
    <p>
        <i><u>{report.origenSecundario}</u></i> a <i><u>{report.destinoSecundario}</u></i>
    </p>
    <p>Seguro <span className="right-align">$<i><u>{report.costoSeguro}</u></i></span></p>
    <p>Descarga Importación <span className="right-align">$<i><u>{report.costoDescargaImportacion}</u></i></span></p>
    <p>
        Flete secundario de Importación{' '}
        <span className="right-align">$<i><u>{report.costoFleteSecundarioImportacion}</u></i></span>
    </p>
    <p>
        <i><u>{report.destinoSecundario}</u></i> a <i><u>{report.destinoPrimario}</u></i>
    </p>
    <p>Nomina de descarga <span className="right-align">$<i><u>{report.costoNominaDescarga}</u></i></span></p>
    <p>Arancel Importación <span className="right-align">$<i><u>{report.arancelImportacion}</u></i></span></p>
    <p>AD de Importación <span className="right-align">$<i><u>{report.costoADImportacion}</u></i></span></p>
    <p>DC de Importación <span className="right-align">$<i><u>{report.costoDCImportacion}</u></i></span></p>

    <h3>Costos de impuestos</h3>
    <p>
        IGI o IGE <span className="percentage"><i><u>{report.porcentajeIgiIge}</u></i>%</span>{' '}
        <span className="right-align">$<i><u>{report.costoIGIIGE}</u></i></span>
    </p>
    <p>
        DTA <span className="percentage"><i><u>{report.porcentajeDTA}</u></i>%</span>{' '}
        <span className="right-align">$<i><u>{report.costoDTA}</u></i></span>
    </p>
    <p>Cuota Compensatoria <span className="right-align">$<i><u>{report.cuotaCompensatoria}</u></i></span></p>
    <p>
        IEPS <span className="percentage"><i><u>{report.porcentajeIEPS}</u></i>%</span>{' '}
        <span className="right-align">$<i><u>{report.costoIEPS}</u></i></span>
    </p>
    <p>
        ISAN <span className="percentage"><i><u>{report.porcentajeISAN}</u></i>%</span>{' '}
        <span className="right-align">$<i><u>{report.costoISAN}</u></i></span>
    </p>
    <p>
        IVA <span className="percentage"><i><u>{report.porcentajeIVA}</u></i>%</span>{' '}
        <span className="right-align">$<i><u>{report.costoIVA}</u></i></span>
    </p>
    <p>PREV <span className="right-align">$<i><u>{report.costoPREV}</u></i></span></p>
    <h5>Total de costos <span className="right-align">$<i><u>{report.totalCostos}</u></i></span></h5>

    <p>
        Precios expresados en dólares al tipo de cambio americano $
        <i><u>{report.cambioDolar}</u></i> por dólar.
    </p>

    <div>
            
            {!report.accepted ? (
                
                <>
                    <p>
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        Acepto los <a href='/dashboard/terms-conditions'>términos y condiciones</a>
                    </p>
                    <button className="acceptButton" onClick={acceptQuote}>
                        Aceptar cotización
                    </button>
                </>
            ) : (
                <>
                    <button className="disabledButton" disabled>
                        Cotización Aceptada
                    </button>
                </>
            )

            }
            
            {errors.acceptQuote ? (
                <p style={{ color: 'red', margin: '2vh' }}>{errors.acceptQuote}</p>
            ) : null}
    </div>

</div>

    );
      
}

export default Report;
