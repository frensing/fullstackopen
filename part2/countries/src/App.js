import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryNameList from './components/CountryNameList'

const baseUrl = 'https://restcountries.com/v3.1'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get(`${baseUrl}/all?fields=name,capital,area,languages,flags`)
      .then(res => {
        console.log(res.data)
        setCountries(res.data)
      })
  }, [])

  const handleSearch = (event) => setSearch(event.target.value.toLowerCase())

  return (
    <div>
      find countries: <input value={search} onChange={handleSearch} />
      <CountryNameList countries={countries} filterState={[search, setSearch]} />
    </div>
  );
}

export default App;
