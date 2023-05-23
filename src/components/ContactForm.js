import React from "react"
import "./style.css"
import logo from './images/logo.png'
import camtomsNews from './images/camtoms_news.png'


export default function ContactForm() {
  return (
      
    <div className='html'>

      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
                <a href="/" className="col-5 mb-2 text-dark text-decoration-none">
                  <img id="img-logo" src={logo} alt="Camtom logo"/>
                </a>
      </header>

      <body>
        
    <div class="contain">
            <h1 class="h1-contactform">Para ofrecerte una solución <br/> te haremos algunas preguntas</h1>
            <img src="images/contactformimage.svg" alt="Contact form ilustration"/>
        
            <div class="input-block">
                <h4 class="label-contactform">¿Cuál es tu nombre?</h4>
                <input class="input-contactform" type="text" placeholder="José Ornelas Guzmán"/>
            </div>

            <div class="input-block">
                <h4 class="label-contactform">Correo electrónico de contacto</h4>
                <input class="input-contactform" type="text" placeholder="pepe@tuempresa.com"/>
            </div>

            <div class="select">
            </div>

            <div class="select-block">
                <h4 class="label-contactform">Cargo en la empresa</h4>
                <select class="select-contactform form-select" >
                    <option selected>Seleccione</option>
                    <option value="1">CEO</option>
                    <option value="2">COO</option>
                    <option value="3">Encargado de Logística</option>
                    <option value="4">Otro</option>
                </select>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>

    </body>


    </div>
    )
}
