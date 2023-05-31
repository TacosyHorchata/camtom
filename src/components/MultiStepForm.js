import React, { useEffect, useState } from 'react';
import {database} from '../firebase.js'
import {ref, push} from "firebase/database";
import "./style.css"

// Crearemos componentes individuales para cada paso del formulario
const Step1 = ({ setForm, formData, navigation }) => {
    const { next } = navigation;
  
    return (
      <div>
        <h3>Paso 1</h3>
        <input
          name="campo1"
          value={formData.campo1 || ''}
          onChange={setForm}
          placeholder="Campo 1"
        />
        <button onClick={next}>Siguiente</button>

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
            {/* select tipo checkbox  */}
            <div class="input-block">
                <h4 class="label-contactform">Legal</h4>
                <h4 class="label-contactform">Regimen Fiscal</h4>
                <select name="regimen fiscal" value={formData.regimen} onChange={setForm} class="select-contactform form-select" >
                    <option selected>Seleccione</option>
                    <option value="Persona Fisica">Persona Fisica</option>
                    <option value="Persona Moral">Persona Moral</option>
                </select>
            </div>

            <div class="input-block">
                <h4 class="label-contactform">Como se llama tu empresa</h4>
                <input class="input-contactform" type="text" placeholder="Piñas Ornelas SA de CV"/>
            </div>

            <div class="input-block">
                <h4 class="label-contactform">Cargo en la empresa</h4>
                <select class="select-contactform form-select" >
                    <option selected>Seleccione</option>
                    <option value="1">CEO</option>
                    <option value="2">COO</option>
                    <option value="3">Encargado de Logística</option>
                    <option value="4">Otro</option>
                </select>
            </div>

            <div class="input-block">
                <h4 class="label-contactform">¿Eres productor?</h4>
                <select class="select-contactform form-select" >
                    <option selected>Seleccione</option>
                    <option value="1">Si</option>
                    <option value="2">No</option>
                </select>
            </div>

            <div class="input-block">
                <h4 class="label-contactform">¿Qué cantidad?</h4>
                <select class="select-contactform form-select" >
                    <option selected>Seleccione</option>
                    <option value="1">1 pallet</option>
                    <option value="2">5 pallets</option>
                    <option value="2">1 contenedor</option>
                </select>
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


      </div>
      </div>
    );
  };
  
  const Step2 = ({ setForm, formData, navigation }) => {
    const { next, previous } = navigation;
  
    return (
      <div>
        <h3>Paso 2</h3>
        <input
          name="campo2"
          value={formData.campo2 || ''}
          onChange={setForm}
          placeholder="Campo 2"
        />
        <button onClick={previous}>Anterior</button>
        <button onClick={next}>Siguiente</button>
      </div>
    );
  };
  
  // Crear componentes similares para los pasos 3, 4 y 5...
  
  const steps = [
    { id: 'step1', component: Step1 },
    { id: 'step2', component: Step2 },
    // Añade los pasos 3, 4 y 5 aquí...
  ];
  
const MultiStepForm = () => {
    const [formData, setFormData] = useState({});
    const [step, setStep] = useState(0);
    
    useEffect(() => {
      // Cuando 'step' sea igual a la longitud del array 'steps', significa que el usuario ha completado el formulario
      if (step === steps.length) {
        // Envía los datos a Firebase
        push(ref(database, 'form/'), formData)
          .then((res) => {
            console.log(res);
          })    
          .catch((err) => {
            console.error(err);
          });
  
        // Después de enviar los datos a Firebase, puedes restablecer el formulario o redirigir al usuario a otra página, etc.
        // Por ahora, simplemente restableceremos el formulario y 'step' a su estado inicial.
        setFormData({});
        setStep(0);
      }
    }, [step]); // Este 'useEffect' se disparará cada vez que 'step' cambie
    
    const props = { 
      formData, 
      setForm: event => setFormData({...formData, [event.target.name]: event.target.value}), 
      navigation: { previous: () => setStep(step - 1), next: () => setStep(step + 1) } 
    };
    
    const Step = steps[step]?.component || (() => <div>¡Formulario completado!</div>);
    
    return (
      <div>
        <h1>Formulario Multi-step</h1>
        <Step {...props} />
      </div>
    );
  };
  
  export default MultiStepForm;