import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function HomePage(props) {
  const [listaAlumnos, setLA] = useState([]);
  const { user } = props;
  useEffect(() => {
    //Conexion con el server GET
    fetch(`${process.env.REACT_APP_SERVER_URL}/alumnos`)
      .then((data) => data.json())
      .then((alumnos) => {
        setLA(alumnos);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <h1>Lista de alumnos</h1>
      {listaAlumnos.map((alumno) => {
        return (
          <p key={alumno._id}>
            {alumno.nombre} {alumno.edad}
            {user && (
              <>
                {user.role === "admin" && (
                  <>
                    <Link to={`/alumnos/${alumno._id}`}>
                      <button>Edit</button>
                    </Link>
                    <button>Delete</button>
                  </>
                )}
              </>
            )}
          </p>
        );
      })}

      <br />
      {user && <>{user.role === "admin" && <button>Solo pa admins</button>}</>}
    </div>
  );
}

export default HomePage;
