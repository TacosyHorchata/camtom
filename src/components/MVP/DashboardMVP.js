import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
//dependencias mapa
import 'react-calendar/dist/Calendar.css';
import Mapbox from 'react-map-gl';

//dependencias calendario
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Sidebar from './Sidebar';
import QuoteForm from './QuoteForm';
import ListReports from './ListReports';
import ListProducts from './ListProducts';
import Report from './ReportPrueba'
import Transactions from './Transactions';
import Shipments from './Shipments';
import TermsConditions from './TermsConditions';
import SuccessQuote from './SucessQuote';
import Help from './Help';

import { useSelector } from 'react-redux';

import axios from 'axios';

import "./DashboardMVP.css"
import EditQuote from './EditQuote';




const serverURL = process.env.REACT_APP_serverURL;

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardPrev/>} />
        <Route path="/quotation/:userId" element={<QuoteForm />} />
        <Route path="/products/:userId" element={<ListProducts/>} />
        <Route path="/reports/:userId" element={<ListReports/>} />
        <Route path="/report/:reportId/:userId" element={<Report/>} />
        <Route path="/shipments" element={<Shipments/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/terms-conditions" element={<TermsConditions/>} />
        <Route path="/success-quote" element={<SuccessQuote/>} />
        <Route path="/editquote/:reportId" element={<EditQuote/>} />

      </Routes>
    </div> 
  );
}

function DashboardPrev() {
  const userId = useSelector(state => state.user.user.userId);
  const userEmail = useSelector(state => state.user.user.email);
  const [reports, setReports] = useState([]);
  const [errors, setErrors] = useState({});

  const getReportFolios = async () => {

    try {
      // Obtiene los folios de los reportes del usuario
      const responseFolios = await axios.get(`${serverURL}/api/reportfolios/${userId}`);
      const arrayfolios = responseFolios.data;

      // Para cada folio, obtener el reporte completo
      const responseReports = await axios.post(`${serverURL}/api/reportfolios/`, {arrayfolios:arrayfolios});

      // Guardar los reportes en el estado del componente
      setReports(responseReports.data);
      setErrors({...errors, loading:null})
      
    } catch (error) {
      console.error("Error obteniendo los datos:", error);
      setErrors({...errors, loading: "Error obteniendo los datos, intente más tarde"});
    }
  };

useEffect(() => {
    getReportFolios();
  }, []);

  let acceptedReports, pendingReports;

  if(reports.length>=1){
    acceptedReports = reports.filter(report => report.accepted === true).length;
    pendingReports = reports.filter(report => report.accepted === false).length;
  }else {
    acceptedReports = 0;
    pendingReports = 0;
  }


  return (
    <div className="main" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh'}}>
      <div id="welcome"><h1>¡Hola, {userEmail}!</h1></div>
      <div id="notifications">Tienes 0 mensajes y 0 notificaciones</div>
      <div className='text-center' 
        style={{ 
                marginTop: 'auto', 
                marginBottom:'50vh'}}>Realiza tu primera operación para ver información estadística.<br/><br/>Tienes {acceptedReports} cotizaciónes confirmadas y {pendingReports} <a href={`/dashboard/reports/${userId}`}>cotizaciones</a> pendientes</div>
    </div>
  );

}





function DashboardHome() {
  const userId = useSelector(state => state.user.user.userId);
  const userEmail = useSelector(state => state.user.user.email);
  const [reports, setReports] = useState([]);
  const [errors, setErrors] = useState({});
  const [value, onChange] = useState(new Date());

  const [viewport, setViewport] = useState({
    latitude: 23.4326,
    longitude: -100.1332,
    zoom: 3.5,
  });

    const getReportFolios = async () => {

        try {
          // Obtiene los folios de los reportes del usuario
          const responseFolios = await axios.get(`${serverURL}/api/reportfolios/${userId}`);
          const arrayfolios = responseFolios.data;
  
          // Para cada folio, obtener el reporte completo
          const responseReports = await axios.post(`${serverURL}/api/reportfolios/`, {arrayfolios:arrayfolios});
 
          // Guardar los reportes en el estado del componente
          setReports(responseReports.data);
          setErrors({...errors, loading:null})
          
        } catch (error) {
          console.error("Error obteniendo los datos:", error);
          setErrors({...errors, loading: "Error obteniendo los datos, intente más tarde"});
        }
      };

    useEffect(() => {
        getReportFolios();
      }, []);

    
    return (
      <div className="main">
            <div id="welcome"><h1>¡Hola, {userEmail}!</h1></div>
            <div id="notifications">Tienes 0 mensajes y 0 notificaciones</div>
            <div className="legend">Para visualizar información, haga su primer envío</div>
            <div className="dashboardHome">
                <div className="dashboardSection">En transito <span>No hay información disponible</span></div>
                <div className="dashboardSection">Proximos <span>No hay información disponible</span></div>
                <div className="dashboardSection">
                  Productos 
                  <span className="scrollable-container">
                    {reports.length > 0 
                    ? reports.map((report, index) => (
                      <div key={index}>
                        <p>{report.producto} - {report.fraccionArancelaria}</p>
                      </div>
                    ))
                    : "No hay información disponible"
                    }
                  </span>
                </div>
                <div className="dashboardMap double-width">
                <Mapbox
                  {...viewport}
                  width="100%"
                  height="100%"
                  onViewportChange={(nextViewport) => setViewport(nextViewport)}
                  mapboxApiAccessToken="pk.eyJ1IjoicGVkcm9yaW9zYSIsImEiOiJjbGlpazExZzMwenVmM3JtcTJ3dnVkN3ZkIn0.NKskgaHf3bjA6OIVQt_jrg"
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                /></div>
                <div className="dashboardBalance">Balance <span>No hay información disponible</span></div>
                <div className="dashboardCalendar full-width">Calendario 
                  <Calendar onChange={onChange} value={value} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;