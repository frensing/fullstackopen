const iconBaseUrl = 'https://openweathermap.org/img/wn/'

const Weather = ({capital, weather}) => {
  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp}°C</p>
      <img 
        src={`${iconBaseUrl}${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default Weather