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
      setWeatherData(null); d
      alert("City not found. Please try another city.");
    }
  };

  useEffect(() => {
    
    search(city);
  }, []);

  return (
    <div className="flex flex-col md:place-self-center items-center justify-center px-10 md:px-60 py-[60px]">
      <h1 className="font-bold text-3xl mb-3">Real-time WeatherApp</h1>
      <div className="border w-[100%] flex flex-col justify-center rounded-lg bg md:w-[50%]">
        <div className="flex flex-row justify-center items-center gap-3 p-8">
          <input
            type="text"
            placeholder="Enter city name"
            className="outline-none border h-[36px] w-[240px] p-6 rounded-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div
            className="bg-[#ebfffc] w-[40px] h-[40px] rounded-full cursor-pointer"
            onClick={() => search(city)}
          >
            <Image src={Search} height={20} alt="Search" className="mx-auto mt-3" />
          </div>
        </div>
        {weatherData && (
          <div className="font-semibold text-white">
            <h1 className="flex justify-center">
              {weatherData.city}, {weatherData.country}
            </h1>
            <div className="flex justify-around items-center">
              <div>
                <Image src={weatherData.image} height={60} width={60} alt="Weather Icon" className="effect" />
                <p className="font-bold">{weatherData.description}</p>
              </div>
              <div>
                <p className="text-3xl">{weatherData.temperature}°C</p>
              </div>
              <div>
                <p>Wind: {weatherData.windSpeed} kmph</p>
                <p>Precip: {weatherData.precip} mm</p>
                <p>Pressure: {weatherData.pressure} mb</p>
              </div>
            </div>
          </div>
        )}
        {weatherData && (
          <div className="flex justify-center mt-6 mb-6 text-white font-semibold gap-2">
            <Image src={Humidty} height={30} width={30} alt="Humidity Icon" />
            <div>
              <p className="text-xl">{weatherData.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
