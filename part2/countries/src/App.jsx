import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";
import countriesService from "./services/countries.js";

function App() {
    const [filter, setFilter] = useState('')
    const [country, setCountry] = useState(null)
    const [countryNames, setCountryNames] = useState([]);

    // get data
    useEffect(() => {
        console.log("effect");
        countriesService
            .getAll()
            .then(countries => {
                const namesArray = countries.map(country => country.name.common);
                setCountryNames(namesArray)
            })
            .catch(error => {
                console.error("Error fetching countries: ", error);
            });
    }, []);

    const handleFilter = (filter) => {
        setFilter(filter)
        console.log(filter)
    }
    const handleCountrySelect = (country) => {
        setCountry(country)
    }

    return(
        <>
            <Filter onFilterChange={handleFilter}/>
            <CountryList countries={countryNames} keyword={filter} onCountrySelect={handleCountrySelect}/>
            <CountryInfo country={country}/>
        </>
    );
}

export default App
