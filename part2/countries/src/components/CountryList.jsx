const CountryList = ({ countries, keyword, onCountrySelect}) => {

    if (!countries || !keyword)
        return null;

    const containsKeyword = (country) => {
        return country.toLowerCase().includes(keyword.toLowerCase());
    }

    const filteredCountries = countries.filter(containsKeyword)

    if (filteredCountries.length > 10) {
        onCountrySelect(null);
        return <p>Too many matches, specify another filter</p>
    }

    if (filteredCountries.length === 1) {
        onCountrySelect(filteredCountries[0]);
        return null;
    }

    onCountrySelect(null)
    return (
        <ul>
            {filteredCountries.map(country => (<li key={country}>{country}</li>))}
        </ul>
    )
}

export default CountryList;
