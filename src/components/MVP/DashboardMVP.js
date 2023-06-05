import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef} from 'react';
//dependencias mapa
import mapboxgl from 'mapbox-gl';


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

mapboxgl.accessToken = 'pk.eyJ1IjoicGVkcm9yaW9zYSIsImEiOiJjbGlpazExZzMwenVmM3JtcTJ3dnVkN3ZkIn0.NKskgaHf3bjA6OIVQt_jrg';

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
  const mapContainerRef = useRef(null);


    const getReportFolios = async () => {

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

    useEffect(() => {
        getReportFolios();
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11', // Style URL
          center: [-95.9876, 22.7405], // Starting position [lng, lat]
          zoom: 3.5, // Starting zoom
        });
    
        // Cleanup on unmount
        return () => map.remove();
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
                <div className="map-container dashboardMap double-width" ref={mapContainerRef}>
                </div>
                <div className="dashboardBalance">Balance <span>No hay información disponible</span></div>
                <div className="dashboardCalendar full-width">Calendario 
                  <Calendar onChange={onChange} value={value} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;