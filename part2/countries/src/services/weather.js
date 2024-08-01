import axios from 'axios'

const baseURL = `https://api.openweathermap.org/data/2.5/weather`
const iconURL = `https://openweathermap.org/img/wn`
const apiKey = import.meta.env.VITE_WEATHER_KEY

const getWeather = (lat, lon) => {
    const request  =
        axios.get(`${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    return request.then(response => {return response.data})
}
const getWeatherIcon = (iconCode) => {
    const request =
        axios.get(`${iconURL}/${iconCode}@2x.png`)
    return request.then(response => {return response.data})
}


export default {getWeather}