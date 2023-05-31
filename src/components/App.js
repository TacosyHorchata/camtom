import React from "react"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Dashboard from "./Dashboard"
import FormSinglePage from "./FormSinglePage"
import MVP from "./MVP/MVP"
import Overlay from "./Overlay"
import Quote from "./MVP/Quote"
import Success from "./Success"
import Login from "./Login"

//translation 

function App() {
      return(
            <Router>
                <div className="App">
                  <Routes>   
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/formsinglepage" element={<FormSinglePage/>}/>
                    <Route path="/success/:messageType" element={<Success/>} />
                    <Route path="/login" element={<Login/>} />
                  </Routes>
                </div> 
            </Router>    
      )
}

export default App
