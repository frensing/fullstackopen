import Country from "./Country"

const CountryNameList = ({countries, filterState}) => {
  const [filter, setFilter] = filterState

  const country = countries.find(c => c.name.common === filter)
  if (country) {
    return <Country country={country} />
  }

  const filtered = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  if (filtered.length === 1) {
    return <Country country={filtered[0]} />
  }
  if (filtered.length === 0) {
    return null
  }
  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <ul>
      {filtered.map(c => 
        <li key={c.id}>
          {c.name.common} <button onClick={() => setFilter(c.name.common)}>show</button>
        </li>)}
    </ul>
  )
}

export default CountryNameList