import { Oval } from 'react-loader-spinner';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';
function Grp204WeatherApp() {
const [input, setInput] = useState('');
const [weather, setWeather] = useState({
loading: false,
data: {},
error: false,
});
const toDateFunction = () => {
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 
'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const WeekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const currentDate = new Date();
const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} $
{months[currentDate.getMonth()]}`;
return date;
};
const search = async (event) => {
if (event.key === 'Enter') {
event.preventDefault();
setInput('');
setWeather({ ...weather, loading: true });
const url = 'https://api.openweathermap.org/data/2.5/weather';
const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
await axios
.get(url, {
params: {
q: input,
units: 'metric',
appid: api_key,
},
})
.then((res) => {
setWeather({ data: res.data, loading: false, error: false });
})
.catch((error) => {
setWeather({ ...weather, data: {}, error: true });
setInput('');
});
}
};
return (
  <div className="App">
  <h1 className="app-name">Application Météo grp204</h1>
  <div className="search-bar">
  <input
  type="text"
  className="city-search"
  placeholder="Entrez le nom de la ville..."
  name="query"
  value={input}
  onChange={(event) => setInput(event.target.value)}
  onKeyPress={search}
  />
  </div>
  {weather.loading && (
  <>
  <Oval type="Oval" color="black" height={100} width={100} />
  </>
  )}
  {weather.error && (
  <>
  <span className="error-message">
  <FontAwesomeIcon icon={faFrown} />
  <span>Ville introuvable</span>
  </span>
  </>
  )}
  {weather && weather.data && weather.data.main && (
  <div>
  <h2>{weather.data.name}, {weather.data.sys.country}</h2>
  <span>{toDateFunction()}</span>
  <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
  alt={weather.data.weather[0].description} />
  <p>{Math.round(weather.data.main.temp)}°C</p>
  <p>Vitesse du vent : {weather.data.wind.speed} m/s</p>
  </div>
  )}
  </div>
  );
  }
  export default Grp204WeatherApp;