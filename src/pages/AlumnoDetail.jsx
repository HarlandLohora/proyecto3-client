import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//GET DETAIL / UPDATE

const AlumnoDetail = () => {
  const { id } = useParams();
  const [alumno, setAlumno] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5005/api/alumnos/${id}`)
      .then((datos) => datos.json())
      .then((alumnoData) => {
        setAlumno(alumnoData);
      })
      .catch(console.log);
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setAlumno({ ...alumno, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5005/api/alumnos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alumno),
    })
      .then((datos) => datos.json())
      .then((alumnoData) => {
        console.log(alumnoData);
      })
      .catch(console.log);
  };

  return (
    <div>
      AlumnoDetail con id {id}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="nombre"
          value={alumno.nombre}
          name="nombre"
          onChange={handleInputChange}
        />
        <br />
        <input
          placeholder="edad"
          value={alumno.edad}
          name="edad"
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default AlumnoDetail;
