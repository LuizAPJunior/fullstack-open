import { useEffect, useState } from "react"
import SearchCountries from "./components/SearchCountries"
import axios from 'axios'
import CountryView from "./components/CountryView"
import CountryShow from "./components/CountryShow"
import Weather from "./components/Weather"

function App() {

  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')

  const regexSearch = new RegExp(searchCountries, "i")
  const countriesToShow = searchCountries ? countries.filter((country) => country.name.common.match(regexSearch)) : []

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountries = (event) => {
    setSearchCountries(event.target.value)
  }

  const displayCountries = () => {

    if (countriesToShow.length === 1) {
      return (
        <>
          <CountryView country={countriesToShow[0]} />
          <Weather country={countriesToShow[0]} />
        </>
      )
    }
    if (countriesToShow.length <= 10) {
      return (
        countriesToShow.map((country) => <CountryShow key={country.name.common} country={country} />)
      )
    }
    if (countriesToShow.length > 10) return <p>Too many matches, specify another filter</p>
  }



  return (
    <div className="App">
      <p> find countries</p><input value={searchCountries} onChange={handleCountries} />
      {displayCountries()}
    </div>
  )
}

export default App
