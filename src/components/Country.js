import axios from 'axios'
import { useState, useEffect } from 'react'

const Country = ({ country }) => {

    const weather_key = process.env.REACT_APP_WEATHER_KEY
    const [weather, setWeather] = useState([])
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
    country.capital +  '&appid=' + weather_key + '&units=metric'

    
    useEffect(()=>{
      
      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })
        
    }
      ,[])


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
                  <h3>Weather in {country.capital}</h3>
                  {weather.length ===0
                    ? <div>No weather</div>
                    : <div>
                      <p>temperature {weather.main.temp}° Celcius</p>
                      <img alt={country.name.common + ' weather icon'}
                      src={'http://openweathermap.org/img/wn/'+ weather.weather[0].icon +'@2x.png'} />
                      <p>wind {weather.wind.speed} m/s</p>
                      </div>
                  }
      </div>
    )
  }
  
export default Country