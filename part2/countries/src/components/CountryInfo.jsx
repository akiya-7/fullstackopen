import WeatherInfo from '../components/WeatherInfo'
import weatherService from '../services/weather.js'
import {useEffect, useState} from "react";

const CountryInfo = ({country}) => {
    if (!country)
        return null

    const [weather, setWeather] = useState(null)

    // gets weather
    useEffect(() => {
        console.log(`getting weather data for ${country['capital'][0]}...`);
        const [lat, lng] = country['capitalInfo']['latlng']
        weatherService.getWeather(lat, lng)
             .then(weather => {setWeather(weather)
                 console.log(weather)})
    }, [country])

    return(
        <>
            <h1>{country.name.common}</h1>
            <div>
                <p>capital(s): {country['capital'].map(capital => <li key={capital}>{capital}</li>)}</p>
                <p>area: {country['area']}</p>
            </div>

            <div>
                <h3><strong>languages:</strong></h3>
                <ul>
                    {Object.values(country.languages).map((language, index) =>
                        (<li key={index}>{language}</li>))}
                </ul>
            </div>

            <div>
                <img src={country['flags']['png']} alt={country['flags']['alt']} />
            </div>

            <div>
                <h2>Weather in {country['capital'][0]}</h2>
                <WeatherInfo info={weather}/>
            </div>

        </>
    )

}

export default CountryInfo