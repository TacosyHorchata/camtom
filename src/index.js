import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from "./components/App"

ReactDOM.render(
  <React.StrictMode>
        <App/>
  </React.StrictMode>,
  document.getElementById("root")
)
