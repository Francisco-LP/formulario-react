import { useState } from "react";

const UseForm = (initialData, onValidate) => { 
    
    /*
    contiene toda la informacion del formulario se inicia con el parametro
    initialData para poder usarlo en otro formulario que se pueda creear despues
    */
    const [form, setForm] = useState(initialData);


    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    //funcion para cuando hayan cambios
    const handleChange = (e) => {
        setForm({
            ...form,        //el contenido de la variable form agrega lo ingresado
            [e.target.name] : e.target.value    // edita la propiedad de name y le agrega el valor value
        })
    };
    
    //funcion para cuando se envia el formulario
    const handleSubmit = (e) => {
        e.preventDefault();      //evita que la pagina se refresque 
        const err = onValidate(form)   //recibe el objeto de errors y lo guarda en err
        setErrors(err)                  //se setea la variable de errores
        
        console.log(Object.keys(err).length);
        
        if(Object.keys(err).length === 0){     //valida si el objeto esta vacio o no
            setLoading(true)
            fetch("https://formsubmit.co/ajax/franciscoandreslagos@gmail.com",{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(form)      //conviete a texto lo que contenga el formulario
            })
            .then(Response => Response.json())       // espera la respuesta y se parsea a json  
            .then(data => {
                console.log(data)       //imprime por consola la informacion
                data.success === "true" && setForm(initialData)    //formulario vuelve al estado inicial
                setLoading(false)       //setLoading pasa a false
            })         
            .catch(error => {
                console.log(error)
                setLoading(false)
            });    // si hay un error lo escribe en consola
        }
    };

    //retorna estas variables para poder usarlas en el formulario
    return {form, errors,loading,handleChange, handleSubmit}

    
}
 
export default UseForm;