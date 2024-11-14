"use client";
import React, { useEffect, useState } from "react";
import Search from "../../public/search.png";
import Image from "next/image";
import Humidty from "../../public/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Lagos");
  const apiKey = "52c645a604bba508631dfa1baf3746aa";

  const search = async (searchCity) => {
    try {
      const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${searchCity}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success === false) {
        throw new Error("City not found");
      }
      setWeatherData({
        city: data.location.name,
        country: data.location.country,
        image: data.current.weather_icons[0],
        description: data.current.weather_descriptions[0],
        temperature: data.current.temperature,
        windSpeed: data.current.wind_speed,
        precip: data.current.precip,
        pressure: data.current.pressure,
        humidity: data.current.humidity,
      });
    } catch (error) {
      console.error(error);
      setWeatherData(null);
      alert("City not found. Please try another city.");
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-20 lg:px-60 py-6 md:py-12">
    <h1 className="font-bold text-2xl md:text-3xl mb-3 text-center">Real-time WeatherApp</h1>
    <div className="border w-full max-w-md flex flex-col justify-center rounded-lg bg p-4 md:p-6">
      <div className="flex flex-row justify-center items-center gap-2 md:gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          className="outline-none border h-10 md:h-12 w-full max-w-xs p-3 rounded-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div
          className="bg-[#ebfffc] w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer flex items-center justify-center"
          onClick={() => search(city)}
        >
          <Image src={Search} alt="Search" className="h-4 w-4 md:h-5 md:w-5" />
        </div>
      </div>
      {weatherData && (
        <div className="font-semibold text-white text-center">
          <h1 className="text-lg md:text-xl mb-3">
            {weatherData.city}, {weatherData.country}
          </h1>
          <div className="flex flex-col md:flex-row justify-around items-center gap-3 text-center mb-4">
            <div>
              <Image src={weatherData.image} height={60} width={60} alt="Weather Icon" />
              <p className="font-bold text-sm md:text-base">{weatherData.description}</p>
            </div>
            <div className="text-2xl md:text-3xl">{weatherData.temperature}°C</div>
            <div className="text-sm md:text-base">
              <p>Wind: {weatherData.windSpeed} kmph</p>
              <p>Precip: {weatherData.precip} mm</p>
              <p>Pressure: {weatherData.pressure} mb</p>
            </div>
          </div>
        </div>
      )}
      {weatherData && (
        <div className="flex justify-center items-center mt-4 text-white font-semibold gap-2">
          <Image src={Humidty} height={24} width={24} alt="Humidity Icon" />
          <div className="text-center">
            <p className="text-lg md:text-xl">{weatherData.humidity}%</p>
            <p className="text-sm">Humidity</p>
          </div>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Weather;
