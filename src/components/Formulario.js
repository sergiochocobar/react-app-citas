import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    //Crear State de Citas
    //cita: va a tener toda la infomacion del STATE y actilzarCita va a modificar ese STATE
    //el useState es un objeto porque en el vamos agregar todo los campos que tenemos
    const [cita, actualizarCita] = useState({    
        mascota : '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    //Funcion que se ejecuta cada vez que el usuario escribe el INPUT
    const actualizarState = e =>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////

    //Segundo STATE para los ERRORES
    const[error, actualizarError] = useState(false);

    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////

    //Extraer valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando el usuario aprieta "agregar cita"
    const submitCita = (e) =>{
        e.preventDefault();

        //Validar
        if(mascota.trim() === "" || propietario.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === ""){
           actualizarError(true);
            return;
        }
        actualizarError(false);

        console.log('agregando...');

        //Asignar un ID
        cita.id = uuid();

        //Crear la CITA
        crearCita(cita);

        //Reiniciar el FORM
        actualizarCita({
            mascota : '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios.</p> : null}

            <form onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input 
                    type="text" 
                    name="mascota" 
                    className="u-full-width" 
                    palceholder="Nombre Mascota" 
                    onChange={actualizarState} 
                    value={mascota} 
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width" 
                    palceholder="Nombre Duseño de la Mascota" 
                    onChange={actualizarState} 
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date" 
                    name="fecha"
                    className="u-full-width" 
                    onChange={actualizarState} 
                    value={fecha}
                />

                <label>Hola</label>
                <input 
                    type="time" 
                    name="hora" 
                    className="u-full-width" 
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea 
                    className="u-full-width" 
                    name="sintomas" 
                    onChange={actualizarState} 
                    value={sintomas}
                ></textarea>

                <button type="submit" className="u-full-width button-primary">Agragar Cita</button>
                
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;