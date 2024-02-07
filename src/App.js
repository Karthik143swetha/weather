import "./App.css";
import Axios from "axios";

import { useEffect, useState } from "react";
//Images
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  long,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="img" />
      </div>

      <div className="temp"> {temp}ºC</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div className="lat">
          <span>Latitude</span> <span>{lat}</span>
        </div>

        <div className="long">
          <span>Longitude</span> <span>{long}</span>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  let apiKey = "52d007fb2e6d2752b7cd3d59f87e6157";

  const [text, setText] = useState("coimbatore");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);


  const WeatherIconMap = {
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon
  }


  const search = async () => {
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;

    try {
      let res = await Axios.get(url).then((r) => r.data);
      /* let data = await res.json(); */
      if (res.cod === "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(res.main.humidity);
      setWind(res.wind.speed);
      setTemp(Math.floor(res.main.temp));
      setCity(res.name);
      setCountry(res.sys.country);
      setLat(res.coord.lat);
      setLong(res.coord.lon);
      const weatherIconCode = res.weather[0].icon;
      setIcon(WeatherIconMap[weatherIconCode] || clearIcon)
      setCityNotFound(false)

    } catch (error) {
      console.error("An error occurred", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  useEffect(function(){
    search();
  }, [])


  return (
    <div className="container">
      <div className="input-container">
        <input
          onKeyDown={handleEnter}
          onChange={handleCity}
          type="text"
          className="cityInput"
          value={text}
          placeholder="Search city"
        />
        <div className="search-icon" onClick={() => search()}>
          <img src={searchIcon} alt="search" width={"30px"} height={"30px"} />
        </div>
      </div>
      <WeatherDetails
        icon={icon}
        temp={temp}
        city={city}
        country={country}
        lat={lat}
        long={long}
        humidity={humidity}
        wind={wind}
      />
      <p className="copyright">
        Designed by <span>Karthik</span>
      </p>
    </div>
  );
}

export default App;
