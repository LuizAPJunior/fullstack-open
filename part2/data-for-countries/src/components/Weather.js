import { useState, useEffect } from "react"
import axios from 'axios'

const Weather = ({ country }) => {

    const [capitalWeather, setCapitalWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
            .then(response => {
                setCapitalWeather(response.data)
            })
    }, [])


    return (
        <>
            <h2>Weather in {capitalWeather ? capitalWeather.name : ''}</h2>
            <p>temperature {capitalWeather ? capitalWeather.main.temp : ''} Celsius</p>
            <img src={capitalWeather ? `http://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png` : ''} />
            <p>wind {capitalWeather ? capitalWeather.wind.speed : ''} m/s </p>
        </>
    )
}

export default Weather