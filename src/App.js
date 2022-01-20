import { useState } from 'react';
import './App.css';
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";

function App() {


  const [place, setPlace] = useState("");
  const [placeInfo, setPlaceInfo] = useState({})

  const handlefetch = () => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=2d006e029d8548c28ff113357222001&q=${place}&days=1&aqi=no&alerts=no`)
      .then(response => response.json())
      .then((data) => setPlaceInfo({

        name: data.location.name,
        country: data.location.country,
        celsius: {
          current:data.current.temp_c,
          high: data.forecast.forecastday[0].day.maxtemp_c,
          low: data.forecast.forecastday[0].day.mintemp_c,
        },

        condition: data.current.condition.text
}
      ));

  };




  return (
    <div className='App'  style={
      placeInfo.condition?.toLowerCase() === "clear" ||
      placeInfo.condition?.toLowerCase() === "sunny"
        ? { backgroundImage: `url(${Clear})` }
        : placeInfo.condition?.includes("cloudy")
        ? { backgroundImage: `url(${Cloudy})` }
        : placeInfo.condition?.toLowerCase().includes("rainy")
        ? { backgroundImage: `url(${Rainy})` }
        : placeInfo.condition?.toLowerCase().includes("snow")
        ? { backgroundImage: `url(${Snow})` }
        : { backgroundImage: `url(${Overcast})` }
    } >
      <div className='search-input'>

        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
        <button onClick={handlefetch}>Search</button>
      </div>
      <div className='weather-container'>
        <div className='top-part'>
          <h1>{placeInfo.celsius?.current}°C</h1>
          </div>
          <div className='condition-high-low'>

          <h1>{placeInfo.condition}</h1>
          <h1>{placeInfo.celsius?.high}°C</h1>
          <h1>{placeInfo.celsius?.low}°C</h1>
         
        </div>
        <h2>{placeInfo.name},{placeInfo.country}</h2>
      </div>
    </div>
  );
}

export default App;
