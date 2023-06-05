import React from "react"
import { useSelector } from 'react-redux';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"

import Dashboard from "./Dashboard"
import FormSinglePage from "./FormSinglePage"
import Overlay from "./Overlay"
import Success from "./Success"
import Login from "./Login"
import QuoteForm from "./MVP/QuoteForm"
import DashboardMVP from "./MVP/DashboardMVP"

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store.js'

const AppRoutes = () => {
  const userId = useSelector(state => state.user.user?.userId);

  // Ruta privada
  const PrivateRoute = ({ children }) => {
    return userId ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/formsinglepage" element={<FormSinglePage/>}/>
          <Route path="/success/:messageType" element={<Success/>} />
          <Route path="/login" element={ userId ? <Navigate to="/dashboard" replace /> : <Login/> }/>
          {/*Ruta al dashboard*/}
          <Route path="/dashboard/*" element={<PrivateRoute><DashboardMVP/></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

const App = () => {
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>    
  )
}

export default App
