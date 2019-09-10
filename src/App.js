import React,{useState, useEffect} from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Spinners  from './components/Spinners';
import Cotizacion from './components/Cotizacion';
import { async } from 'q';
import Axios from 'axios';


function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda]= useState('');
  const [cargando, guardarCargando]= useState(false);
  const [resultado, guardarResultado]= useState({});

  useEffect(() =>{
    if (moneda==='') return;
    const cotizarCriptomoneda= async () =>{
      const url= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await Axios.get(url);
      
      guardarCargando(true);

      //Ocultar el spinner
      setTimeout(()=>{
          guardarCargando(false);
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      },3000)
    }
    cotizarCriptomoneda();
  }, [moneda, criptomoneda])

  const componente= (cargando) ? <Spinners />    : <Cotizacion resultado={resultado}/>;


  return (
    <div className="container">
        <div className="row">
            <div className="one-half column">
                <img src={imagen} alt="imagen criptomonedas" className="logotipo" />
            </div>

            <div className="one-half column">
              <h1>Cotiza tu criptomoneda Al Instante</h1>

              <Formulario
                guardarMoneda={guardarMoneda}
                guardarCriptomoneda={guardarCriptomoneda}
              />
              {componente}

            </div>

        </div>
    </div>

  
  );
}

export default App;
