const CountryInfo = ({country}) => {
    if (!country)
        return null

    return(
        <>
            <h1>{country.name.common}</h1>
            <div>
                <p>capital: {country['capital']}</p>
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
        </>
    )

}

export default CountryInfo