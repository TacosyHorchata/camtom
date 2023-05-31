import React, { useState } from "react";
import './style/Login.css';

import logo from './images/logo.png'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("Usuario o contraseña incorrecto");
    };

    return (
        <div className="login-wrapper">
            <a href="/">
            <img src={logo} alt="Logo" />
            </a>
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
            
            <a href="/"><p>Volver a inicio</p></a>
        </div>

    );
}

export default Login;
