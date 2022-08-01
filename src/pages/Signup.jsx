import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";

import "./auth.css";
//Componentes
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    pais: "",
    email: "",
    fullName: "",
    url: "",
  });
  const { username, password, pais, email, fullName, url } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
      email,
      pais,
      fullName,
      url,
    };
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <input
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="Contrasena"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="Pais"
          name="pais"
          value={pais}
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="Nombre completo"
          name="fullName"
          value={fullName}
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="Correo"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="Url"
          name="url"
          value={url}
          onChange={handleInputChange}
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
