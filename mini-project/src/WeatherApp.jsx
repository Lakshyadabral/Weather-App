// WeatherApp.jsx
import { useState, useMemo } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Halifax",
    feelsLike: 19.88,
    humidity: 66,
    temp: 20.09,
    tempMax: 20.27,
    tempMin: 19.01,
    weather: "overcast clouds",
  });

  const { bg, isDark } = useMemo(() => {
    if (weatherInfo.humidity > 80) {
      return { bg: "linear-gradient(135deg,#1a2740,#0e1526)", isDark: true };
    }
    if (weatherInfo.temp > 15) {
      return { 
        bg: "linear-gradient(135deg,#ffefba,#ffffff)", // soft warm gradient, not plain white
        isDark: false 
      };
    }
    return { bg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)", isDark: true };
  }, [weatherInfo]);

  return (
    <div
  style={{
    minHeight: "100svh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: bg,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    color: isDark ? "#fff" : "#111",
    overflow: "hidden",
  }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        <SearchBox updateInfo={setWeatherInfo} isDark={isDark} />
        <InfoBox info={weatherInfo} isDark={isDark} />
      </div>
    </div>
  );
}
