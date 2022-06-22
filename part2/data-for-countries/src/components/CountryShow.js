import { useState } from "react"
import CountryView from "./CountryView"

const CountryShow = ({country}) => {

    const [show, setShow] = useState(false)

    const handleShowCountry = () =>{
        setShow(!show)
    } 
   
    return (
        <>
            <p>{country.name.common} <span><button onClick={handleShowCountry}> {show? 'hide':'show'} </button></span></p>
            {show? <CountryView country={country}/>:''}
        </>
    )
}

export default CountryShow