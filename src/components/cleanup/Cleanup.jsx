import React, { useEffect, useState } from 'react'

function Cleanup() {

    const [windowidth, setWindowidth] = useState(window.innerWidth)

    const handleRize = () =>{
        setWindowidth(window.innerWidth);
    }

    useEffect(()=>{

        window.addEventListener('resize', handleRize)

        return () =>{
            window.removeEventListener('resize', handleRize)
        }

    }, [])

  return (
    <div>
        <h2>Ancho de la pantalla {windowidth} px</h2>
    </div>
  )
}

export default Cleanup