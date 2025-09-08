import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";

export default function InfoBox({ info, isDark }) {
  const INIT_URL =
    "https://images.unsplash.com/photo-1594156596782-656c93e4d504?q=80&w=1035&auto=format&fit=crop";
  const HOT_URL =
    "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=1200&auto=format&fit=crop"; 
  const COLD_URL =
    "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?q=80&w=1200&auto=format&fit=crop";
  const RAIN_URL =
    "https://images.unsplash.com/photo-1638471120388-0ac73e8fe44c?q=80&w=1200&auto=format&fit=crop";

  const hero =
    info.humidity > 80 ? RAIN_URL : info.temp > 15 ? HOT_URL : COLD_URL;

  const Icon =
    info.humidity > 80
      ? ThunderstormIcon
      : info.temp > 15
      ? WbSunnyRoundedIcon
      : AcUnitIcon;

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card
          sx={{
            width: "100%",
            maxWidth: 500,
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "transparent",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            color: isDark ? "#fff" : "#111", 
          }}
        >
          <CardMedia sx={{ height: 180 }} image={hero || INIT_URL} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {info.city} <Icon />
            </Typography>

            <Typography component="div" sx={{ fontSize: "0.95rem" }}>
              <p>Temperature: {Math.round(info.temp)}°C</p>
              <p>Humidity: {info.humidity}%</p>
              <p>Min Temp: {Math.round(info.tempMin)}°C</p>
              <p>Max Temp: {Math.round(info.tempMax)}°C</p>
              <p>
                The weather is <i>{info.weather}</i> and feels like{" "}
                {Math.round(info.feelsLike)}°C
              </p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
