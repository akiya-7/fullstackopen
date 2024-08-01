const WeatherInfo = ({info, capital}) => {
    if(!info) return null;

    const temperature = info['main']['temp'];
    const windSpeed = info['wind']['speed'];
    const iconCode = info['weather'][0]['icon'];
    const iconAlt = info['weather'][0]['description'];
    
    const iconLink = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    return(
        <div id={'weather-info'}>
            <h2>Weather in {capital}</h2>
            <p>temperature {temperature}{'\u00BA'} Celsius</p>
            <img src={iconLink} alt={iconAlt}/>
            <p>wind {windSpeed} m/s</p>
        </div>
    )
}

export default WeatherInfo