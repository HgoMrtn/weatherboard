import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherNight,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindyCloudy,
  TiWeatherWindy,
} from "react-icons/ti";

export function getWeatherSymbol(weatherCondition) {
  var lowerString = weatherCondition.toLowerCase();
  if (
    lowerString.includes("rain") &&
    !lowerString.includes("heavy") &&
    !lowerString.includes("shower")
  ) {
    return <TiWeatherShower size={20} />;
  } else if (lowerString.includes("rain")) {
    return <TiWeatherDownpour size={20} />;
  } else if (lowerString.includes("snow")) {
    return <TiWeatherSnow size={20} />;
  } else if (lowerString.includes("cloudy")) {
    return <TiWeatherCloudy size={20} />;
  } else if (lowerString.includes("thunder")) {
    return <TiWeatherStormy size={20} />;
  } else if (
    lowerString.includes("overcast") ||
    lowerString.includes("partly")
  ) {
    return <TiWeatherPartlySunny size={20} />;
  } else {
    // Default icon if no conditions are met
    return <TiWeatherSunny size={20} />;
  }
}
