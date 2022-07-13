const Country = ({ country }) => {
    return (
      <div style={{'textAlign': 'center'}}>
                  <h1>{country.name.common}</h1>
                  <p>Capital: {country.capital}</p>
                  <p>Area: {country.area}</p>
                  <h3>languages: </h3>
                  <ul>
                    {Object.keys(country.languages).map(item =>
                    <li key={item}>{country.languages[item]}</li>
                      )}
                  </ul>
                  <img src={country.flags.png} alt={country.name.common + ' flag'} />
      </div>
    )
  }
  
export default Country