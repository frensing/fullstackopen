const Country = ({country}) => {

  return (
    <div>
      <h2>{country.name.common}</h2>
      <table>
        <tbody>
          <tr><td>Capital:</td><td>{country.capital}</td></tr>
          <tr><td>Area:</td><td>{country.area}</td></tr>
        </tbody>
      </table>
      <h4>Languages</h4>
      {Object.entries(country.languages).map(([k, v], i) => <li key={i}>{v}</li>)}
      <br/>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default Country