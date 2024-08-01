import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";
import countriesService from "./services/countries.js";

function App() {
    const [filter, setFilter] = useState('')
    const [country, setCountry] = useState(null)
    const [countryNames, setCountryNames] = useState([])
    const [countryInfo, setCountryInfo] = useState(null)

    // get all country names for querying
    useEffect(() => {
        console.log("get all countries...");
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

    // get selected country info
    useEffect(() => {
        if(country)
            countriesService
                .getCountry(country)
                .then(response => setCountryInfo(response))
        else
            setCountryInfo(null)
    }, [country])

    const handleFilter = (filter) => {
        setFilter(filter)
    }
    const handleCountrySelect = (selectedCountry) => {
            setCountry(selectedCountry || null)
    }
    return(
        <>
            <Filter onFilterChange={handleFilter}/>
            <CountryList countries={countryNames} keyword={filter} onCountrySelect={handleCountrySelect}/>
            <CountryInfo country={countryInfo}/>
        </>
    );
}

export default App
