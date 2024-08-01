import {useEffect} from "react";

const WeatherInfo = ({info}) => {
    if(!info) return null;

    const temperature = info['main']['temp'];
    const windSpeed = info['wind']['speed'];

    useEffect(() => {

    }, []);

    return(
        <>
            <p>temperature {temperature}{'\u00BA'} Celsius</p>
            <p>wind {windSpeed} m/s</p>
        </>
    )
}

export default WeatherInfo