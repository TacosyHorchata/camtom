import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/reducers.js'; 

import logo from '../images/logo_w.svg';
import home_icon from '../images/icons-mvp/home.svg';
import box_icon from '../images/icons-mvp/box.svg';
import calendar_icon from '../images/icons-mvp/calendar.svg';
import moneytransfer_icon from '../images/icons-mvp/moneytransfer.svg';
import paidbill_icon from '../images/icons-mvp/paidbill.svg';
import truck_icon from '../images/icons-mvp/truck.svg';
import logout from '../images/icons-mvp/logout.svg';

import './Sidebar.css';

import { useSelector } from 'react-redux';

// Importa la acción que limpia el userId del estado de Redux
// Asegúrate de usar la acción correcta de tu aplicación
// import { logOut } from '../redux/actions';

const Sidebar = () => {
  const userId = useSelector(state => state.user.user.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  }

  return (
    <div className="sidebar">
      <div className="logoContainer">
        <img className="logoSidebar" src={logo} alt="Logo"/>
      </div>
      <nav>
        <ul>
          <li><img src={home_icon}/><Link to={`/dashboard`}>Dashboard</Link></li>
          <li><img src={box_icon}/><Link to={`/dashboard/products/${userId}`}>Productos</Link></li>
          <li><img src={paidbill_icon}/><Link to={`/dashboard/reports/${userId}`}>Cotizaciones</Link></li>
          {/*<li><img src={moneytransfer_icon}/><Link to={`/dashboard/transactions`}>Transacciones</Link></li>*/}
          <li><img src={truck_icon}/><Link to={`/dashboard/shipments`}>Envíos</Link></li>
          {/*<li><img src={calendar_icon}/>Calendario<br/>(Proximamente)</li>*/}
        </ul>
      </nav>
      <div className="buttonContainer">
        <Link to={`/dashboard/quotation/${userId}`}><button className="newQuotationButton">Nueva Cotización</button></Link>
      </div>
      <div onClick={handleLogout} className="logoutContainer">
        <Link>
        <ul>
        <li><img src={logout}/>Cerrar Sesión</li>
        </ul>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
