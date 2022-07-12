import { useState, useEffect } from 'react'
import Person from './components/Person'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)})
  }, [])


  const countriesToShow =  
    countries.filter(country => 
      country.name.common.toLowerCase().includes(filter) )


  const handleFilter = (event) =>{
    setFilter(event.target.value)
  }

  

  return (
    <div style={{
      'maxWidth': '400px',
      'margin': '0 auto',
      'minHeight': 'auto',
      'padding': '20px',
      'border' : '1px solid black',
      'borderRadius': '5px'
    }}>
      <h2>Countries</h2>
        <label>
          <span style={{'marginRight': '10px'}}>
            filter shown with 
          </span>
          <input value={filter} onChange={handleFilter} />
        </label>
      <h2>Results</h2>
      
        {countries.length !== 0
        ? countriesToShow.length <= 10
            ? countriesToShow.length !== 1
              ? <ul>{countriesToShow.map(country =>
                 <li key={country.cca2}>{country.name.common}</li>)}</ul>
              : <div style={{'textAlign': 'center'}}>
                  <h1>{countriesToShow[0].name.common}</h1>
                  <p>Capital: {countriesToShow[0].capital}</p>
                  <p>Area: {countriesToShow[0].area}</p>
                  <h3>languages: </h3>
                  <ul>
                    {Object.keys(countriesToShow[0].languages).map(item =>
                    <li key={item}>{countriesToShow[0].languages[item]}</li>
                      )}
                  </ul>
                  <img src={countriesToShow[0].flags.png} />
                </div>
            : <div>There are too many matches</div>
        : <div>Waiting...</div>}
      
    </div>
  )
}

export default App