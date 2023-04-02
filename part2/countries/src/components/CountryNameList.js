import Country from "./Country"

const CountryNameList = ({countries, filterState, setCapital, weather}) => {
  const [filter, setFilter] = filterState

  const country = countries.find(c => c.name.common === filter)
  if (country) { 
    // Special case to show country if search is exactly country name like "Sudan"
    setCapital(country.capital)
    return <Country country={country} weather={weather} />
  }

  const filtered = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  if (filtered.length === 1) {
    const country = filtered[0]
    setCapital(country.capital)
    return <Country country={country} weather={weather} />
  }
  if (filter === "" || filtered.length === 0) {
    return null
  }
  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <ul>
      {filtered.map((c,i)=> 
        <li key={i}>
          {c.name.common} <button onClick={() => setFilter(c.name.common)}>show</button>
        </li>)}
    </ul>
  )
}

export default CountryNameList