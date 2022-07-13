import { useState, useEffect } from 'react'
import Country from './components/Country'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [ flagArr, setFlagArr ] = useState({})

  
  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)})
  }, [])


  const countriesToShow =  
    countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase()) )


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
            filter countries by:
          </span>
          <input value={filter} onChange={handleFilter} />
        </label>
      <h2>Results</h2>
      
        {countries.length !== 0
        ? countriesToShow.length <= 10
            ? countriesToShow.length !== 1
              ? countriesToShow.length !== 0
                ? <ul>{countriesToShow.map((country, index) =>{
                  return <li key={country.cca2}>
                    {country.name.common} &nbsp;
                    <button onClick={()=> setFlagArr({ ...flagArr, [index]: !flagArr[index] }) }>
                      Show</button>
                    {flagArr[index]
                      ? <Country country={countriesToShow[index]} />
                      : <></>
                    }
                    </li>}
                  )}
                  </ul>
                : <div>There aren't matches</div>
              : <Country country={countriesToShow[0]} />
            : <div>There are too many matches</div>
        : <div>Waiting...</div>}
      
    </div>
  )
}

export default App