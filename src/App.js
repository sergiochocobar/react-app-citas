import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario.js';
import Cita from './components/Cita.js';

function App() {

  // Citas en LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas')); 
  if(!citasIniciales){
    citasIniciales = [];
  }
  

  // Arreglo de todas las citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // useEffect para realizar ciertas operaciones cuando el state cambie
  useEffect( () => {
      if(citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas));
      }else{
        localStorage.setItem('citas', JSON.stringify([]));
      }
  }, [citas, citasIniciales] ) //PASAMOS "CITAS INICIALES" PORQUE NOS TIRABA UN  WARNING EN CONSOLA. pERO ES LO MISMO QUE NO LO PONGAMOS


  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Funcion que elimina un cita por su ID
  const eliminarCita = (id) => {
    const nuevaCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevaCitas);
  }

  //Mensaje Condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  cita = {cita}
                  key = {cita.id}
                  eliminarCita = {eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
