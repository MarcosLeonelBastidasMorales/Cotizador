import React, {useState, useEffect} from 'react';
import Criptomoneda from './Criptomoneda';
import Error from './Error';
import { async } from 'q';
import Axios from 'axios';


function Formulario ({guardarMoneda, guardarCriptomoneda }) {

    const [criptomonedas, guardarCriptomonedas] = useState([]);
    const [modenaCotizar, guardarMonedaCotizar] = useState('');
    const [criptoCotizar, guardarCriptoCotizar] = useState ('');
    const [error, guardarError] = useState(false);


    useEffect(() =>{
        const consultarAPI= async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD';
            const resultado = await Axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    })

    const cotizarMoneda = (e) =>{
        e.preventDefault();

        //Validar que los campos esten llenos
        if(modenaCotizar === '' || criptoCotizar===''){
            guardarError(true);
            return;
        }

        // Pasar los datos  a la APP principal
        guardarError(false);
        guardarMoneda(modenaCotizar);
        guardarCriptomoneda(criptoCotizar)
    }

    /////////////////////////////////////////        MOSTRAR EL ERROR EN CASO DE QUE EXISTA

    let componente = (error) ? <Error mensaje='Ambos Campos son Obligatorias'/> : null;

     
    return(

        <form
            onSubmit ={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label>Elige tu Moneda</label>
                <select
                    className='u-full-width'
                    onChange= {e => guardarMonedaCotizar(e.target.value)}
                >
                    <option value=''>---Elege Tu Moneda---</option>
                    <option value='VES'>Bolivar Venezolano</option>
                    <option value='USD'>Estado  Undidos</option>
                    <option value='MXN'>Peso Mexicana</option>
                    <option value='GBP'>Libras</option>
                    <option value='EUR'>Euro</option>
                </select>
            </div>

            <div className="row">
                <label>Elige tu Criptomoneda</label>
                <select
                    className='u-full-width'
                    onChange= {e => guardarCriptoCotizar(e.target.value)}
                >
                    <option value=''>---Elege Tu Criptomoneda---</option>
                    {criptomonedas.map(criptomoneda=> (
                        <Criptomoneda 
                            key= {criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}

                </select>
            </div>
            <input type='submit' className='button-primary u-full-width' value='Calcular'/>

        </form>

    )
};

export default Formulario;