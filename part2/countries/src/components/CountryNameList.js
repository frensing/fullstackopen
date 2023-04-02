import Country from "./Country"

const CountryNameList = ({countries, filter}) => {
  const filtered = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filtered.length === 0) {
    return null
  }

  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (filtered.length === 1) {
    return <Country country={filtered[0]} />
  }

  return (
    <ul>
      {filtered.map(c => <li key={c.id}>{c.name.common}</li>)}
    </ul>
  )
}

export default CountryNameList