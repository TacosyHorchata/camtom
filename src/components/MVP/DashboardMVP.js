import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
//dependencias mapa
import 'react-calendar/dist/Calendar.css';
import { Mapbox } from 'react-map-gl';

//dependencias calendario
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Sidebar from './Sidebar';
import QuoteForm from './QuoteForm';
import ListReports from './ListReports';
import ListProducts from './ListProducts';
import Report from './Report'
import Transactions from './Transactions';
import { useSelector } from 'react-redux';

import axios from 'axios';

import "./DashboardMVP.css"

const serverURL = process.env.REACT_APP_serverURL;

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/quotation/:userId" element={<QuoteForm />} />
        <Route path="/products/:userId" element={<ListProducts/>} />
        <Route path="/reports/:userId" element={<ListReports/>} />
        <Route path="/report/:reportId/:userId" element={<Report/>} />
        <Route path="/transactions" element={<Transactions/>} />

      </Routes>
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
          console.error("Error obteniendo los reportes:", error);
          setErrors({...errors, loading: "Error obteniendo los reportes, intente más tarde"});
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
                  <span>
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