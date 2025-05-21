import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Weather.css'
import { Clock2, MapPinCheckInside, MapPinned, Search, Thermometer } from 'lucide-react';


function Weather() {

  // const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=f46e3963573a2c59ef6a651f4913efd1`;
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`;
  const API_KEY = `f46e3963573a2c59ef6a651f4913efd1`;
  const query = 'q={city name}';
  const coordsx = 'lat={lat}&lon={lon}';
  const options = '';

  const [city, setCity] = useState('Colombia')
  const [coords, setCoords] = useState({ lat: 0, lon: 0 })
  const [data, setData] = useState(null);




  useEffect(() => {

    const dt = Math.floor(Date.now() / 1000);

    getWeatherByCity();

    //   return () => {

    //   }
  }, [])


  const handlerCity = (e) => {
    e.preventDefault();
    getWeatherByCity();

  }


  const getWeatherByCity = async () => {
    const { lat, lon } = coords;
    // axios.get(`${BASE_URL}${lat !=0 && lon != 0? `${lat}&lon=${lon}`:`q=${city}`}&appid=${API_KEY}`).
    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&lang={lang}
    //https://api.openweathermap.org/data/2.5/weather?q=London&appid=f46e3963573a2c59ef6a651f4913efd1

    let location = lat != 0 && lon != 0 ? `lat=${lat}&lon=${lon}` : `q=${city}`;

    //axios.get(`${BASE_URL}${city}&appid=${API_KEY}`).

    // console.log(`${BASE_URL}${city}&appid=${API_KEY}`);
    // console.log(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=f46e3963573a2c59ef6a651f4913efd1`);



    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f46e3963573a2c59ef6a651f4913efd1`).
      then((res) => {
        console.log(res.data);
        setData(res.data);
      });

  }

  //FUNCIÓN QUE RETORNA LA HORA LOCAL DEL LUGAR DE CONSULTA
  const getTimeFromTimezoneOffset = (timezoneOffsetSeconds) => {
    const nowUtc = new Date(); // Fecha actual
    const utcMs = nowUtc.getTime() + nowUtc.getTimezoneOffset() * 60000; // Convertir a UTC
    const targetDate = new Date(utcMs + timezoneOffsetSeconds * 1000); // Aplicar offset
    return targetDate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const changeGradosCentigrados = (kelvin) => {

    return `${(kelvin - 273).toFixed(2)} °C`;
  }

  const changeHoraMinutos = (valor) => {

    const date = new Date(valor * 1000);


    const horasMinutos = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // para formato 24h
    });

    return horasMinutos;

  }

  return (
    <>
      <div className='container-card'>

        <div className='card'>
          <div className='con-search'>
            <form onSubmit={handlerCity}>
              <Search />
              <input type="text" maxLength={30} onChange={(e) => { setCity(e.target.value); }} />
              <button><MapPinned /></button>
            </form>
          </div>

          <div className='celda-main'>
            <div>
              <MapPinCheckInside /> <p>{data?.name}</p>
            </div>
            <div>
              <Thermometer />
              <p> {changeGradosCentigrados(data?.main?.temp)}</p>
            </div>
            <div>
              <Clock2 />
              <p>{getTimeFromTimezoneOffset(data?.timezone)}</p>
            </div>
          </div>
        </div>


        <div className='card'>
          <div className='detalle-card'>
            <div>
              <p className='datos-naranja'>{changeGradosCentigrados(data?.main?.feels_like)}</p>
              <p>Sensación <br /> térmica</p>
            </div>
            <div>
              <p>{changeGradosCentigrados(data?.main?.temp_min)}</p>
              <p>Temperatura <br /> Mínima</p>
            </div>
            <div>
              <p className='datos-naranja'>{changeGradosCentigrados(data?.main?.temp_max)}</p>
              <p>Temperatura <br /> Máxima</p>
            </div>
          </div>
        </div>

        <div className='card'>
          <div className='detalle-card'>
            <div>
              <p> {data?.clouds?.all}</p>
              <p>Nubosidad <br /> térmica</p>
            </div>
            <div>
              <p>{changeGradosCentigrados(data?.main?.temp_min)}</p>
              <p>Temperatura <br /> Mínima</p>
            </div>
            <div>
              <p className='datos-naranja'>{changeGradosCentigrados(data?.main?.temp_max)}</p>
              <p>Temperatura <br /> Máxima</p>
            </div>
          </div>













          <div className='detalle-card'>
            <div>
              <p> {data?.main?.sea_level}</p>
              <p>Nivel  <br /> del mar</p>
            </div>
            <div>
              <p>{data?.main?.humidity}</p>
              <p>Humedad </p>
            </div>
            <div>
              <p className='datos-naranja'>{data?.main?.pressure}</p>
              <p>Presión <br /> atmosférica</p>
            </div>
          </div>



          <div className='detalle-card'>
            <div>
              <p> {data?.visibility}</p>
              <p>Visibilidad </p>
            </div>
            <div>
              <p>{data?.weather[0]?.description}</p>
              <p>Descripción</p>
            </div>
            <div>
              <p className='datos-naranja'>{data?.weather[0]?.main}</p>
              <p>Tiempo</p>
            </div>
          </div>

          <div className='detalle-card'>
            <div>
              <p> {changeHoraMinutos(data?.sys?.sunrise)}</p>
              <p>Amanece </p>
            </div>
            <div>
              <p>{changeHoraMinutos(data?.sys?.sunset)}</p>
              <p>Atardece</p>
            </div>
            <div>
              <p className='datos-naranja'>{data?.wind?.speed}</p>
              <p>Velocidad del viento</p>
            </div>
          </div>








        </div>









        {/* <p>Nivel del mar:{data?.main?.sea_level}</p> */}
        {/* <p>Humedad:{data?.main?.humidity}</p> */}
        {/* <p>Presión atmosférica:{data?.main?.pressure}</p> */}
        {/* <p>Amanece: {changeHoraMinutos(data?.sys?.sunrise)}</p>
        <p>Atardece: {changeHoraMinutos(data?.sys?.sunset)}</p> */}
        {/* <p>Visibilidad:{data?.visibility}</p> */}
        {/* <p>Descripción:{data?.weather[0]?.description}</p>
        <p>Tiempo:{data?.weather[0]?.main}</p> */}




        {/* <p>Velocidad del viento:{data?.wind?.speed}</p> */}

        <hr />





      </div>
    </>
  )
}

export default Weather