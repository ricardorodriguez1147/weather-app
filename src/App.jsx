import { useState } from 'react'
import Cleanup from './components/cleanup/Cleanup'
import Weather from './components/weather/Weather'
import './App.css'


function App() {


  const [isShow, setIsshow] = useState(true);


  return (
    <>
      <div className='container'>

        <Weather />

        {/* <button type="button" onClick={()=> setIsshow(!isShow)}>
          Cambiar
        </button>
       {isShow && <Cleanup />} */}
      </div>

    </>
  )
}

export default App
