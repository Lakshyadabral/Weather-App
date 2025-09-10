// WeatherApp.jsx — drop-in replacement
import { useState, useMemo, useEffect } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {

  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);

const API_URL = import.meta.env.VITE_OWM_API_URL;
const API_KEY = import.meta.env.VITE_OWM_API_KEY;
  useEffect(() => {
    const fetchHalifax = async () => {
      try {
        const res = await fetch(
          `${API_URL}?q=${encodeURIComponent("Halifax")}&appid=${API_KEY}&units=metric`
        );
        const json = await res.json();
        if (!res.ok || json?.cod === "404" || json?.cod === 404) {
          throw new Error(json?.message || "City not found");
        }
        const initialInfo = {
          city: "Halifax",
          temp: json.main.temp,
          tempMin: json.main.temp_min,
          tempMax: json.main.temp_max,
          humidity: json.main.humidity,
          feelsLike: json.main.feels_like,
          weather: json.weather[0].description,
        };
        setWeatherInfo(initialInfo);
      } catch (err) {
        setWeatherInfo({
          city: "Halifax",
          feelsLike: 19.88,
          humidity: 66,
          temp: 20.09,
          tempMax: 20.27,
          tempMin: 19.01,
          weather: "overcast clouds",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHalifax();
  }, []);

  const { bg, isDark } = useMemo(() => {
    if (!weatherInfo) {
      return { bg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)", isDark: true };
    }
    if (weatherInfo.humidity > 80) {
      return { bg: "linear-gradient(135deg,#1a2740,#0e1526)", isDark: true };
    }
    if (weatherInfo.temp > 15) {
      return {

        bg: "linear-gradient(135deg,#FFCF71 0%, #FDB813 45%, #F96D00 100%)",
        isDark: false,
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
        {loading ? (
          <div style={{ opacity: 0.85, padding: 12 }}>Loading Halifax weather…</div>
        ) : (
          <InfoBox info={weatherInfo} isDark={isDark} />
        )}
      </div>
    </div>
  );
}
