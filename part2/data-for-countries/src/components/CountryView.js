const CountryView = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map((language => <li key={language[1]}>{language[1]}</li>))}
            </ul>
            <img src={country.flags['png']} />
        </div>
    )
}

export default CountryView