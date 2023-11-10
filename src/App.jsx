import React, { useState, useEffect } from "react";
// import testBg from "./assets/test-bg.svg";
// import weatherIcon from "/weather-icon.svg";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Spinner from "./components/Spinner";
import { GetBgImage } from "./components/GetBgImage";
import { getWeatherSymbol } from "./components/GetWeatherSymbol";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function getWeekdayFromTimestamp(timestamp) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const dayOfWeekIndex = date.getDay();
  const weekday = daysOfWeek[dayOfWeekIndex];
  return weekday;
}

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState("Paris");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${searchValue}&days=3`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "188bc506admsha3d2c87e0c98154p1ae261jsn674c6ec78a99",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        setWeatherData(data);
        data.current.is_day == 1 ? setDarkMode(false) : setDarkMode(true);
      } catch (error) {
        // console.error(error);
        window.location.reload();
      }
    };

    fetchWeatherData();
  }, [searchValue]); // Empty dependency array ensures the effect runs once after the initial render

  // Function to handle search bar changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle button click
  const handleButtonClick = () => {
    const searchTerm = inputValue.replace(/ /g, "+");
    // console.log("Search:", searchTerm);
    setSearchValue(searchTerm);
    setInputValue("");
  };

  // Function to handle "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <>
      {weatherData ? (
        <div
          className={`${
            darkMode ? "dark" : ""
          } bg-center bg-cover px-10 py-7 flex flex-col gap-10 min-h-screen max-h-fit`}
          style={{
            backgroundImage: `url(${GetBgImage(
              weatherData.current.condition.text,
              weatherData.current.is_day
            )})`,
          }}
        >
          <div className="flex flex-wrap justify-center gap-4 sm:justify-between">
            {/* App Name */}
            <div className="space-y-1">
              <h1 className="text-gray-700 font-normal text-md dark:text-white">
                <b>WeatherBoard</b> | Get real time weather data
              </h1>
              <a
                href="https://github.com/HgoMrtn/"
                target="_blank"
                rel="nofollow"
                className="text-xs text-black/70 hover:underline dark:text-white/70"
              >
                Brought to you by Hugo Martin
              </a>
            </div>
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full bg-white/30 backdrop-blur-sm rounded-lg border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 dark:text-white"
                  placeholder="Search City"
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  value={inputValue}
                />
              </div>
              <button
                type="button"
                className="rounded-lg bg-indigo-600 p-1 h-9 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleButtonClick}
              >
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Main Container */}
          <div className="flex flex-col justify-center items-center flex-grow">
            {/* Glass card */}
            <div className="flex flex-col place-self-center bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-1 border-white/30 text-gray-700 h-fit dark:text-white">
              {/* Current Day */}
              <div className="space-y-2 mb-10">
                <h2 className="font-semibold text-3xl">
                  {weatherData.location.name}
                </h2>
                <h3 className="font-normal text-3xl">
                  {Math.round(weatherData.current.temp_c)} °C
                </h3>
                <h3 className="font-normal text-lg">
                  {weatherData.current.condition.text}
                </h3>
                <p>
                  Feels like {Math.round(weatherData.current.feelslike_c)} °C
                </p>
              </div>
              {/* 3-day Forecast */}
              <span className="inline-flex items-center gap-1 text-xs mb-2">
                <CalendarIcon className="h-4 w-4 stroke-2" /> 3-DAY FORECAST
              </span>
              <div className="border-t border-gray-600/30 mb-3 dark:border-white/30" />
              <ul>
                {weatherData.forecast.forecastday.map((forecastItem) => (
                  <li
                    key={forecastItem.date_epoch}
                    className="flex flex-col gap-2"
                  >
                    <div className="grid grid-cols-3 justify-between text-sm sm:text-base">
                      <p>{getWeekdayFromTimestamp(forecastItem.date_epoch)}</p>
                      {getWeatherSymbol(forecastItem.day.condition.text)}
                      <p>
                        {Math.round(forecastItem.day.mintemp_c)}
                        {" - "}
                        {Math.round(forecastItem.day.maxtemp_c)} °C
                      </p>
                    </div>
                    <div className="border-t border-gray-600/30 mb-3 dark:border-white/30" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-800">
          <div className="flex flex-col items-center text-gray-300 gap-7">
            <Spinner />
            Loading weather data...
          </div>
        </div>
      )}
    </>
  );
}
