import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Report.css'

const serverURL = process.env.REACT_APP_serverURL;


const ReportPrueba = () => {
    const [report, setReport] = useState({
        folio: "",
        userId: "",
        fechaCreacion: "",
        producto: "",
        fraccionArancelaria: "",
        cantidad: "",    
        origenPrimario: "",
        destinoPrimario: "",
        origenSecundario: "",
        destinoSecundario: "",
        incoterm: "",
        costoMercancia: 0,
        secciones: [{
          titulo: "",
          subtitulos: [{
            nombre: "",
            conceptos: [{
              concepto: "",
              porcentaje: "", 
              valor: 0,
            }]
          }]
        }],
        totalCostos: 0,
        cambioDolar: 0,
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

    {report.secciones.map((seccion, seccionIndex) => (
      <div key={`seccion-${seccionIndex}`}>
        <h3>{seccion.titulo}</h3>
        {seccion.subtitulos.map((subtitulo, subtituloIndex) => (
          <div key={`subtitulo-${subtituloIndex}`}>
            <h5><i>{subtitulo.nombre}</i></h5>
            {subtitulo.conceptos.map((concepto, conceptoIndex) => (
              <p key={`concepto-${conceptoIndex}`}>
                {concepto.concepto}
                <span className="right-align">$<i><u>{concepto.valor}</u></i></span>
              </p>
            ))}
          </div>
        ))}
      </div>
    ))}

    <h5>Total de costos <span className="right-align">$<i><u>{report.totalCostos}</u></i></span></h5>

    <p style={{color:'grey'}}>
        <i>Precios expresados en dólares al tipo de cambio americano $
        <u>{report.cambioDolar}</u> por dólar.</i>
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

export default ReportPrueba;
