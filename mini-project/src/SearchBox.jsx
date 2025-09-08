import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo, isDark }) {
  let [city, setCity] = useState("");
  let [error, SetError] = useState(false);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "fc750880d5cc6a461c08b95311e06347";

  const getWeatherInfo = async () => {
    const res = await fetch(`${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
    const json = await res.json();
    if (!res.ok || json?.cod === "404" || json?.cod === 404) {
      throw new Error(json?.message || "City not found");
    }
    return {
      city,
      temp: json.main.temp,
      tempMin: json.main.temp_min,
      tempMax: json.main.temp_max,
      humidity: json.main.humidity,
      feelsLike: json.main.feels_like,
      weather: json.weather[0].description,
    };
  };

  let handleChange = (evt) => {
    setCity(evt.target.value);
    if (error) SetError(false);
  };

  let handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
      SetError(false);
    } catch (err) {
      SetError(true);
    }
  };

  return (
    <div className='SearchBox'>
      <h1 className="heading">Search for the weather</h1>
      <form onSubmit={handleSubmit}>
   <TextField
  id="city"
  label="City Name"
  variant="outlined"
  required
  value={city}
  onChange={handleChange}
  fullWidth
  sx={{
    "& .MuiInputBase-input": {
      color: isDark ? "#fff" : "#111",
    },
    // Label color
    "& .MuiInputLabel-root": {
      color: isDark ? "#fff" : "#111",
      opacity: 0.85,
    },
    // Border color
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "#fff" : "#111",
    },
  }}
/>
        <br /><br /><br />
   <Button
  variant="contained"
  type="submit"
  sx={{
    backgroundColor: isDark ? "#ffffff" : "#111111",
    color: isDark ? "#111111" : "#ffffff",
    "&:hover": {
      backgroundColor: isDark ? "#eaeaea" : "#222222",
    },
  }}
>
          Search
        </Button>
        {error && <p style={{ color: isDark ? "#ffd4d4" : "red", marginTop: 10 }}>No such place exist</p>}
      </form>
    </div>
  );
}
