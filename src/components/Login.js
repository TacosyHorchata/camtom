import React, { useState } from "react";
import './style/Login.css';
import logo from './images/logo.png'
import {
  signInWithEmailAndPassword,
 } from "firebase/auth";
 import {auth} from "../firebase.js";
 import { useDispatch } from 'react-redux';
 import { login } from '../redux/reducers.js'; 
 import { useNavigate } from "react-router-dom";

 import axios from "axios";

 const serverURL = process.env.REACT_APP_serverURL;

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const userCredential = await signInWithEmailAndPassword(auth, username, password);
          console.log(`${serverURL}/api/login/${userCredential.user.uid}`)
          const userIdResponse = await axios.get(`${serverURL}/api/login/${userCredential.user.uid}`);
          const userId = userIdResponse.data._id;
            console.log(userIdResponse)
          const user = {
            userId: userId,
            email: userCredential.user.email,
          };
      
          dispatch(login(user));
          setError("");
          navigate(`/dashboard`);
        } catch (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError("Usuario o contraseña incorrecto");
        }
      };

    return (
        <div className="login-wrapper">
            <a href="/">
                <img src={logo} alt="Logo" />
            </a>
            <div className="form-signup-wrapper">
            <form onSubmit={handleSubmit}>
                <label>
                    <p><b>Usuario</b></p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p><b>Contraseña</b></p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
            <div className="signup-wrapper">
                <p>¿Aún no tienes cuenta?<br/><a href="/formsinglepage" style={{color:'black'}}>Exporta ahora</a></p>
            </div>
            </div>
            
            <a href="/"><p>Volver a inicio</p></a>
        </div>
    );
}

export default Login;