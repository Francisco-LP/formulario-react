import React from "react";
import UseForm from "../components/UseForm";

const Formulario = () => {

  const initialData = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  };


  const onValidate = (form) => {

    let errors = {}          // objetos vacio de inicio
    //expresiones regulares
    let expRegTexto = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;
    let expRegEmail = /(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let expRegComentarios = /^.{1,255}$/;

    //si no existe form.nombre es decir que el formulario viene vacio entonces se cambia el valor de isError a true por que ocurrio un erro
    // retorna si es un error se retornan los valores como tal y si no retornamos un null para saber que no hubo error
  
    if(!form.nombre.trim()){      //trim borra los espacios vacios en un principio  y al final
      errors.nombre = "El campo no debe estar vacio"

    }else if(!expRegTexto.test(form.nombre)){         //chequea si las espresion regular se cumple
      errors.nombre = "El campo solo acepta letras y espacios"

    }

    if(!form.correo.trim()){      //trim borra los espacios vacios en un principio  y al final
      errors.correo = "El campo no debe estar vacio"

    }else if(!expRegEmail.test(form.correo)){       //chequea si las espresion regular se cumple
      errors.correo = "El campo correo contiene un formato no valido"

    }

    if(!form.asunto.trim()){      //trim borra los espacios vacios en un principio  y al final
      errors.asunto = "El campo no debe estar vacio"

    }else if(!expRegComentarios.test(form.asunto)){       //chequea si las espresion regular se cumple
      errors.asunto = "El campo asunto solo acepta 255 caracteres"

    }

    if(!form.mensaje.trim()){      //trim borra los espacios vacios en un principio  y al final
      errors.mensaje = "El campo no debe estar vacio"

    }else if(!expRegComentarios.test(form.mensaje)){        //chequea si las espresion regular se cumple
      errors.mensaje = "El campo mensaje solo acepta 255 caracteres"

    }

    return errors
  };

  const {form, errors,loading, handleChange, handleSubmit} = UseForm(initialData, onValidate);

  return (
    <div className="container mt-5">
        <h3>Formulario</h3>
      <form className="w-50" onSubmit={handleSubmit}>
        <label htmlFor="nombre" className="form-label mt-3">Nombre</label>
        <input type="text" name="nombre" className="form-control mb-3" value={form.nombre} onChange={handleChange}/>
        {errors.nombre && <div className="alert alert-danger p-2" role="alert">{errors.nombre}</div>}

        <label htmlFor="correo">Correo: </label>
        <input type="email" name="correo" className="form-control mb-3" value={form.correo} onChange={handleChange}/>
        {errors.correo && <div className="alert alert-danger p-2" role="alert">{errors.correo}</div>}

        <label htmlFor="asunto">Asunto: </label>
        <input type="text" name="asunto" className="form-control mb-3" value={form.asunto} onChange={handleChange}/>
        {errors.asunto && <div className="alert alert-danger p-2" role="alert">{errors.asunto}</div>}

        <label htmlFor="mensaje" >Mensaje: </label>
        <textarea name="mensaje" className="form-control "cols="30"rows="10" value={form.mensaje} onChange={handleChange}>
        </textarea>
        {errors.mensaje && <div className="alert alert-danger p-2 mt-3" role="alert">{errors.mensaje}</div>}

        <button type="submit" className="btn btn-success mt-5 w-100" disabled={loading}>{loading ? "Enviando..." : "Enviar"}</button>
      </form>
    </div>
  );
};

export default Formulario;
