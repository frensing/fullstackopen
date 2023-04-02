import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryNameList from './components/CountryNameList'

const baseUrl = 'https://restcountries.com/v3.1'

const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric`

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  const [capital, setCapital] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseUrl}/all?fields=name,capital,area,languages,flags`)
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  useEffect(() => {
    if (capital) {
      axios
      .get(`${weatherUrl}&q=${capital}`)
      .then(res => {
        setWeather(res.data)
      })
    }
  }, [capital])

  const handleSearch = (event) => setSearch(event.target.value)

  return (
    <div>
      find countries: <input value={search} onChange={handleSearch} />
      <CountryNameList 
        countries={countries} 
        filterState={[search, setSearch]} 
        setCapital={setCapital} 
        weather={weather} />
    </div>
  );
}

export default App;
